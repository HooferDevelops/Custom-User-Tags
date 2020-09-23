const { Plugin } = require('powercord/entities');
const { React, getModule, getModuleByDisplayName} = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');
const Settings = require('./components/Settings');
const tag = require('./components/Tag.jsx');

module.exports = class CustomUserTags extends Plugin {
    


    async startPlugin(){



        const getSetting = (setting) => this.settings.get(setting);
        this.loadStylesheet('style.scss')
        function getUser(id) {
            var list = getSetting("userTags")
            return list.find(e=> e.id == id)
        }

        powercord.api.settings.registerSettings('bot-tag-settings', {
            category: this.entityID,
            label: 'User Tags',
            render: Settings
        });

        const PrivateChannel = await getModuleByDisplayName('PrivateChannel');
        const MemberListItem = await getModuleByDisplayName('MemberListItem'); // thanks badges-everywhere
        const MessageTimestamp = await getModule(["MessageTimestamp"]);
        inject('bot-tag-message', MessageTimestamp, "default", function(args, res){
            var id = args[0].message.author.id;
            var user = getUser(id);
            if (user != null){
                res.props.children[1].props.children.join()
                res.props.children[1].props.children.splice(2, 0, React.createElement(tag,{style: {'background': user.background, 'color': user.fontcolor}, tagName: user.tag, classType: `bot-tag-tooltip ${user.animated}`}))
                res.props.children[1].props.children.join()
                
            }
            return res;
        })
        inject('bot-tag-members', MemberListItem.prototype, 'renderDecorators', function(args, res){
            if (!this.props.user.id) return res;
            var id = this.props.user.id
            var user = getUser(id);
            if (user != null){
                res.props.children[0] = React.createElement(tag,{style: {'background': user.background, 'color': user.fontcolor}, tagName: user.tag, classType: `bot-tag-tooltip ${user.animated}`})
            } else if (this.props.user.bot == true) {
                res.props.children[0] = React.createElement(tag,{tagName: "BOT", classType: "bot-tag-tooltip"})
            }
            return res;
        })
        inject('bot-tag-sidebar', PrivateChannel.prototype, 'render', function (args, res) {
            if (!this.props.user) return res;
            var id = this.props.user.id
            var user = getUser(id);
            if (user != null){
                res.props.name.props.children = [res.props.name.props.children]
                res.props.name.props.children.push(React.createElement(tag,{style: {'background': user.background, 'color': user.fontcolor}, tagName: user.tag, classType: `bot-tag-tooltip ${user.animated}`}));
            } else if (this.props.user.bot == true){
                res.props.name.props.children = [res.props.name.props.children]
                res.props.name.props.children.push(React.createElement(tag,{tagName: "BOT", classType: "bot-tag-tooltip"})); // heck off i'm doing it this way, i don't know a better way help me (っ °Д °;)っ
            }
            return res;
        })
    }


        




    pluginWillUnload(){
        uninject('bot-tag-message')
        uninject('bot-tag-sidebar')
        uninject('bot-tag-members')
        powercord.api.settings.unregisterSettings('bot-tag-settings');
    }

};
