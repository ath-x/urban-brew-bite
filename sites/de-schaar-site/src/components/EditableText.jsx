import React from 'react';

/**
 * EditableText (Passive Wrapper for Docked Track)
 * Renders text with 'data-dock-bind' for Athena Dock.
 * Inline editing is disabled in favor of the Dock's specialized Modal editor.
 */
export default function EditableText({ tagName: Tag = 'span', value, children, cmsBind, table, field, id, className = "", style = {}, renderValue, ...props }) {
  const isDev = import.meta.env.DEV;

  const actualValue = value !== undefined ? value : children;
  const binding = cmsBind || { file: table, index: id, key: field };

  const isObject = typeof actualValue === 'object' && actualValue !== null && !React.isValidElement(actualValue);
  
  let content = actualValue;
  if (isObject) {
    if (actualValue.text !== undefined) content = actualValue.text;
    else if (actualValue.title !== undefined) content = actualValue.title;
    else if (actualValue.label !== undefined) content = actualValue.label;
    else content = JSON.stringify(actualValue);
  }
  
  // Ultimate safety: never allow an object to seep into the DOM text Node
  if (typeof content === 'object' && content !== null && !React.isValidElement(content)) {
    content = JSON.stringify(content);
  }
  
  // Filter out any literal [object Object] strings that might have been saved by error
  if (typeof content === 'string' && content === '[object Object]') {
    content = 'Onbekende tekst';
  }

  const individualStyle = isObject ? {
    color: actualValue.color,
    fontSize: actualValue.fontSize ? `${actualValue.fontSize}px` : undefined,
    fontWeight: actualValue.fontWeight,
    fontStyle: actualValue.fontStyle,
    textAlign: actualValue.textAlign,
    textTransform: actualValue.textTransform,
    display: actualValue.textAlign ? 'block' : undefined,
    width: actualValue.textAlign ? '100%' : undefined,
    ...style
  } : style;

  if (!isDev) {
    return <Tag className={className} style={individualStyle} {...props}>{content}</Tag>;
  }

  const dockBind = JSON.stringify({
    file: binding.file,
    index: binding.index || 0,
    key: binding.key
  });

  return (
    <Tag
      data-dock-bind={dockBind}
      data-dock-type="text"
      className={`${className} cursor-pointer hover:ring-2 hover:ring-blue-400/40 hover:bg-blue-50/5 rounded-sm transition-all duration-200`}
      style={individualStyle}
      title={`Shift+Klik om "${binding.key}" te bewerken in de Dock`}
      {...props}
    >
      {content}
    </Tag>
  );
}
