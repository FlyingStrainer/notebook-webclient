import React from "../../../lib/react.js";

export default class PageView extends React.Component {

    constructor(props) {
        super(props);

        this.parent = props.parentHandler;

        this.notebook = props.notebook;
        this.entry = props.entry;

        this.setImage = this.setImage.bind(this);

        this.state = { entryState : "stateLoad " };

        this.setImage();
    }

    componentDidMount() {
        this.mounted = true;
        setTimeout(function() {
            if(this.mounted) {
                this.setState({ entryState: "stateLoad stateTransition " });

                setTimeout(function() {
                    if(this.mounted && this.state.entryState === "stateLoad stateTransition ")
                        this.setState({ entryState: "" });

                }.bind(this), 300);
            }
        }.bind(this), 300);
    }

    componentWillReceiveProps(nextProps) {
        this.entry = nextProps.entry;
        this.setImage();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    setImage() {
        this.imageSrc = "../images/";
        if(this.entry.image) {
            if(this.notebook.settings.image === "inline")
                this.imageSrc += "entry_image_inline.png";
            else
                this.imageSrc += "entry_image_below.png";
        }
        else
            this.imageSrc += "entry_no_image.png";
    }

    render() {
        return (<a className={this.state.entryState + "entries--entry"} onClick={e => (e.preventDefault(), this.parent.reviewEntry(this.entry))}>
            <div className="entry--title">{this.entry.author}</div>
            <div className="entry--date">{this.entry.date_created}</div>
            <div className="notebook--scribbles" style={{background : "url('" + this.imageSrc + "') no-repeat", "background-size" : "contain"}} />
        </a>);
    }
}