import React from 'react';
import { FormItem, FormText, Tooltip, Button, Divider } from '@vizality/components/';

module.exports = ({field,hoverText}) => (
   <Tooltip
   text={hoverText}
   className='vz-settings-button-item-button-wrapper suspicious-url-tooltip'
   >
    <div class="suspicious-url">
        {field}
    </div>
   </Tooltip>
);