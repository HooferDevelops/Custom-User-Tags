import React from 'react';

import { Plugin } from '@vizality/entities';
import { findInReactTree } from '@vizality/util/react';
import { patch, unpatch } from '@vizality/patcher';
import { getModule, getModuleByDisplayName, getModules } from '@vizality/webpack';

const label = require('./components/label.jsx');

export default class HoofersFirstPlugin extends Plugin {
start () {
    this.injectStyles('style.scss');
    const MaskedLink = getModuleByDisplayName("MaskedLink", false)
    patch('title-inject', MaskedLink.prototype, "render", (args, res) => {
        if (!res.props || !res.props.children)
            return res;
        if (typeof(res.props.children) === "object")
            res.props.children = res.props.children[0];

        if (!res.props.href.startsWith("https://discord"))
            res.props.children = React.createElement(label, {field:res.props.children,hoverText:res.props.children});
        
        return res;
    });
  }

  stop () {
     unpatch('title-inject')
  }
}