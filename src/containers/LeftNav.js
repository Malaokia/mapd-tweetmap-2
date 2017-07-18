import {connect} from "react-redux"
import MediaQuery from "react-responsive"
import NavItem from "../components/NavItem"
import PropTypes from "prop-types"
import React from "react"
import SearchPopover from "./SearchPopover"
import {zoomOut} from "../thunks/map"

class LeftNav extends React.Component {
  static propTypes = {
    closeNav: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    openShare: PropTypes.func.isRequired,
    search: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
  };

  constructor () {
    super()
    this.state = {
      shareModal: false
    }
  }

  render () {
    const searchPopover = <SearchPopover closeNav={this.props.closeNav} />

    return (
      <div className="nav" id="sideNav" >
        {/* Close Nav */}
        <MediaQuery query="(max-width: 992px)">
          <a id="close" onClick={this.props.closeNav}>
            &times;
          </a>
        </MediaQuery>

        {/* Search Location */}
        <NavItem
          body={this.props.search ? searchPopover : null}
          className={this.props.search ? "searchPopover" : null}
          clicked={() => { this.props.toggle() }}
          description="Search Location"
          icon="location"
        />

        {/* Share */}
        <NavItem
          clicked={() => {
            this.props.dispatch(zoomOut())
            this.props.closeNav()
          }}
          description="Zoom Out"
          icon="globe"
        />

        {/* Github */}
        <NavItem
          description="See Repo"
          icon="mark-github"
          url="https://github.com/mapd/new-tweetmap"
        />

        {/* About */}
        <NavItem
          description="About"
          icon="info"
          url="https://www.mapd.com"
        />

        {/* Share */}
        <NavItem
          clicked={() => {
            this.props.openShare()
            this.props.closeNav()
          }}
          description="Share"
          icon="link"
        />
      </div>
    )
  }
}

export default connect()(LeftNav)
