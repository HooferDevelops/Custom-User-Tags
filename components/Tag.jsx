const { Tooltip } = require('powercord/components');
const { React } = require('powercord/webpack');

module.exports = ({tagName, classType, style}) => (
  <Tooltip position='top' text={`${tagName}`} className={`${classType}`} delay={200}>
    <div className='bot-tag-plugin' style={style}>{`${tagName}`}</div>
  </Tooltip>
);
