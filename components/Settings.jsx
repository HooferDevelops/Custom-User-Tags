const { React, getModule } = require('powercord/webpack')
const { Category, SwitchItem, TextInput, SliderInput, KeybindRecorder } = require('powercord/components/settings')
const { Button } = require('powercord/components');
const Tag = require("./Tag");
const CategoryImage = require("./CategoryImg");

var users = [];

module.exports = class Settings extends React.PureComponent {
    constructor (props) {
        super(props);
        this.plugin = powercord.pluginManager.get('test-plugin') || powercord.pluginManager.get('test-plugin-master'); // do not direct download smh
        this.state = {}
        this.state.currentId = "000000000000000000"
        this.listOpened = false;
      }

    info = getModule(["getUser"], false).getUser

    addNewUser(){
        users.push({open: false, id: "000000000000000000", tag: "BOT", background: "#7289DA", fontcolor: "#FFFFFF", animated: false, name: "INVALID USER", pfp: "https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"});
        return users;
    }
    removeUser(i){
        users.splice(i, 1);
        return users;
    }
    updateUserId(i,id,name,pfp){
        users[i].id = id;
        users[i].name = name;
        users[i].pfp = pfp;
        return users;
    }
    updateUserTag(i,tag){
        users[i].tag = tag;
        return users;
    }
    updateUserBackground(i,bg){
        users[i].background = bg;
        return users;
    }
    updateUserFontColor(i,color){
        users[i].fontcolor = color;
        return users;
    }
    toggle(i,val){
        users[i].open = val;
        return users;
    }
    updateUserAnimated(i,val){
        if (users[i].animated == false){
            users[i].animated = "bot-tag-animated"
        } else {
            users[i].animated = false
        }
        return users;
    }

    render() {
        const { getSetting, updateSetting } = this.props;
        users = getSetting("userTags");
        if (!users){
            users = []
            updateSetting("userTags", users)
        }
        return(
            <div>



                
                <Category name="Users" description="Add and remove user tags for users" opened={this.state.listOpened} onChange={p=>{this.setState({"listOpened": p})}}>
                    {users.map((user, i) => (
                        
                        <div>
                            <CategoryImage image={user.pfp} name={user.name} opened={user.open} onChange={(p)=>{updateSetting('userTags', this.toggle(i, p))}}>
                                <h1 style={{color: "white"}}>Preview</h1>
                                <Tag tagName={user.tag} style={{background: user.background, color: user.fontcolor}} classType={`bot-tag-tooltip bottom-margin-large-bot-tag ${user.animated}`}></Tag>

                                <h1 style={{color: "white"}}>Basic Configuration</h1>
                                <TextInput
                                defaultValue={user.id}
                                onChange={p=>{
                                    if (p.length > 18) {
                                        updateSetting('userTags', this.updateUserId(i,p.substring(0, 18)));
                                        return;
                                    };
                                    this.info(p.toString()).then(res=>{
                                        updateSetting('userTags', this.updateUserId(i,p,res.username, res.avatarURL))
                                    })
                                    .catch((err)=>{
                                        if (err){
                                            updateSetting('userTags', this.updateUserId(i,p,"INVALID USER", "https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"))
                                        }
                                    })
                                    
                                    
                                }}
                                >
                                    Set User ID
                                </TextInput>
                                <TextInput
                                defaultValue={user.tag}
                                onChange={p=>{
                                    updateSetting('userTags', this.updateUserTag(i,p))
                                    
                                }}
                                >
                                    Set User Tag
                                </TextInput>

                                <h1 style={{color: "white"}}>Customization</h1>
                                <TextInput
                                defaultValue={user.background}
                                onChange={p=>{
                                    updateSetting('userTags', this.updateUserBackground(i,p))
                                }}
                                note={"This allows all css values for the background attribute. Example: linear-gradient"}
                                >
                                    Set Tag Background
                                </TextInput>
                                <TextInput
                                defaultValue={user.fontcolor}
                                onChange={p=>{
                                    updateSetting('userTags', this.updateUserFontColor(i,p))
                                }}
                                note={"This allows all css values for the color attribute."}
                                >
                                    Set Tag Text Color
                                </TextInput>
                                <h1 style={{color: "white"}}>Advanced Configuration</h1>
                                <SwitchItem
                                    value={user.animated}
                                    onChange={p=>{
                                        updateSetting('userTags', this.updateUserAnimated(i,false))
                                    }}
                                >Animated Background</SwitchItem>

                                <Button color={Button.Colors.RED} onClick={()=>{
                                    updateSetting('userTags', this.removeUser(i));
                                }}
                                >Remove User</Button>
                            </CategoryImage>
                        </div>
                    ))}
                    <Button
                    onClick={() => {updateSetting('userTags', this.addNewUser())}}
                    >
                    Add New User
                    </Button>   
                </Category>
            <a
            style={{fontSize: "10px"}}
            onClick={()=> {
                require("electron").shell.openExternal("http://iman.engineer");
            }}
            >More Plugins & Themes</a>
            </div>
        )
    }
}
