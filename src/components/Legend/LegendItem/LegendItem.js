import PropTypes from "prop-types"
import React from "react"

const LegendItem = props =>
  <div className="legendItem">
    {!props.justTitle &&
      <div className="legendLabel" style={{backgroundColor: props.color}} />
    }

    <div className="legendBlock">
      <p>
        {props.title}
      </p>
      <p className="greyText">
        {props.sub}
      </p>
    </div>

    {props.active ? null : <div className="whitedOut" />}
  </div>

LegendItem.propTypes = {
  active: PropTypes.bool.isRequired,
  color: PropTypes.string,
  justTitle: PropTypes.bool,
  sub: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default LegendItem
