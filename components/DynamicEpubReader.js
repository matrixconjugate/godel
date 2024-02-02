// components/DynamicEpubReader.js
import { useEffect, useState } from 'react';
import EPUB from 'epub';
import htmlToText from 'html-to-text';
import Dropzone from 'react-dropzone';

const DynamicEpubReader = () => {
  const [chapters, setChapters] = useState([]);

  const handleDrop = (acceptedFiles) => {
    const epubUrl = URL.createObjectURL(acceptedFiles[0]);
    const epub = new EPUB(epubUrl);

    epub.on('end', () => {
      const chapters = epub.flow.map((chapter) => {
        const text = htmlToText.fromString(chapter.content, { wordwrap: 130 });
        return {
          title: chapter.title,
          content: text,
        };
      });
      setChapters(chapters);
    });

    epub.parse();
  };

  return (
    <div>
      <Dropzone onDrop={handleDrop} accept=".epub">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={{ border: '1px solid #ccc', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop an EPUB file here, or click to select one</p>
          </div>
        )}
      </Dropzone>

      {chapters.map((chapter, index) => (
        <div key={index}>
          <h2>{chapter.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
        </div>
      ))}
    </div>
  );
};

export default DynamicEpubReader;
