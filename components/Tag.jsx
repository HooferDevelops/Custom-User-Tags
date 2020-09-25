const { Tooltip } = require('powercord/components');
const { React } = require('powercord/webpack');

module.exports = ({tagName, classType, style}) => (
  <Tooltip position='top' text={`${tagName}`} className={`${classType}`} delay={200}>
    <span style={style} className='botTag-3W9SuW botTagRegular-2HEhHi botTag-2WPJ74 px-10SIf7' id={`tag-${tagName}`}>
      <span className="botText-1526X_">{`${tagName}`}</span>
    </span>
  </Tooltip>
);
