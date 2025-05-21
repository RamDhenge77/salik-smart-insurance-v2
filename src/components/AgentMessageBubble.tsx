
import React from 'react';
import ReactMarkdown from 'react-markdown';
// import AgentAvatar from './AgentAvatar';

interface AgentMessageBubbleProps {
  message: string;
}

const AgentMessageBubble: React.FC<AgentMessageBubbleProps> = ({ message }) => {
  return (
    <div className="flex items-start space-x-3 max-w-[100%]">
  <div className="bg-white rounded-2xl rounded-tl-none px-4 overflow-hidden">
    <div className="text-gray-800 text-sm leading-tight">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="my-0">{children}</p>,
          h1: ({ children }) => <h1 className="text-xl font-bold my-0">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-bold my-0">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-bold my-0">{children}</h3>,
          ul: ({ children }) => <ul className="list-disc pl-4 my-0">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-4 my-0">{children}</ol>,
          li: ({ children }) => <li className="my-0">{children}</li>,
          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-gray-300 pl-2 my-0 italic text-sm">{children}</blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-gray-100 px-1 py-0 rounded text-sm">{children}</code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-100 p-1 rounded my-0 overflow-x-auto text-sm">{children}</pre>
          ),
          table: ({ children }) => (
            <table className="min-w-full border border-gray-300 my-0 text-sm">{children}</table>
          ),
          thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr className="border-b border-gray-200">{children}</tr>,
          th: ({ children }) => (
            <th className="px-1 py-0.5 text-left font-bold border-r last:border-r-0">{children}</th>
          ),
          td: ({ children }) => <td className="px-1 py-0.5 border-r last:border-r-0">{children}</td>,
        }}
      >
        {message}
      </ReactMarkdown>
    </div>
  </div>
</div>

  );
};

export default AgentMessageBubble;
