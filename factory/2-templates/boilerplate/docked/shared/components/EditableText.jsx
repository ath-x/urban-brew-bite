import React from 'react';
import { useDisplayConfig } from './DisplayConfigContext';

/**
 * EditableText (Docked Track)
 * Passive wrapper that binds to the Athena Dock.
 */
export default function EditableText({ tagName: Tag = 'span', value, children, cmsBind, table, field, id, className = "", style = {}, renderValue, ...props }) {
  const { isFieldVisible } = useDisplayConfig() || {};
  const isDev = import.meta.env.DEV;

  const actualValue = value !== undefined ? value : children;
  const binding = cmsBind || { file: table, index: id, key: field };

  // 1. Visibility Check
  if (isFieldVisible && !isFieldVisible(binding.file, binding.key)) {
    return null;
  }

  const isObject = typeof actualValue === 'object' && actualValue !== null && !React.isValidElement(actualValue);
  const content = renderValue ? renderValue(actualValue) : (
    isObject
      ? (actualValue.text || actualValue.title || actualValue.label || JSON.stringify(actualValue))
      : actualValue
  );

  // 2. Individual Styles from Object
  const individualStyle = isObject ? {
    color: actualValue.color,
    fontSize: actualValue.fontSize ? `${actualValue.fontSize}px` : undefined,
    fontWeight: actualValue.fontWeight,
    fontStyle: actualValue.fontStyle, // Italic support
    textAlign: actualValue.textAlign,
    ...style
  } : style;

  if (!isDev) {
    return <Tag className={className} style={individualStyle} {...props}>{content}</Tag>;
  }

  // Generate binding string for Dock
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
