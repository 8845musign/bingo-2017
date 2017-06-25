import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Link from 'next/link'
import PropTypes from 'prop-types'

import { lottery } from '../modules/game'

import Slot from './Slot'

const onClick = select => () => {
  select(1)
}

class IndexContainer extends Component {
  render () {
    return (
      <div className='container'>
        <style jsx global>{`
          html,
          body {
            margin: 0;
            padding: 0;
          }
        `}</style>

        <style jsx>{`
          .container {
            position: relative;
            width: 1920px;
            height: 1080px;
            margin: auto;
            background-image: url('/static/images/bg.png');
          }

          .game {
            position: absolute;
            top: 0;
            left: 0;
            width: 1920px;
            height: 1080px;
            background-image: url('/static/images/bg-game.png');
            cursor: pointer;
          }

          .slot {
            position: absolute;
            width: 750px;
            height: 750px;
            top: 60px;
            left: 580px;
          }

          .link-result {
            display: inline-block;
            position: absolute;
            top: 20px;
            right: 14px;
          }

          .btn-next {
            position: absolute;
            bottom: 27px;
            left: 380px;
            height: 165px;
            width: 1160px;
            background-color: transparent;
            border: none;
          }
        `}</style>

        <div className='game'>
          <div className='slot'>
            <Slot
              pattern={this.props.pattern}
              members={this.props.members}
              reelTop={this.props.reelTop}
            />
          </div>

        </div>

        <Link href='result'>
          <a className='link-result'><img src='/static/images/btn-result.png' alt='今までの結果' /></a>
        </Link>

        <button className='btn-next' onClick={onClick(this.props.lottery)} disabled={this.props.isEnd || this.props.isAnimating} aria-label='next' />
      </div>
    )
  }
}

IndexContainer.propTypes = {
  isEnd: PropTypes.bool.isRequired,
  members: PropTypes.object.isRequired,
  lottery: PropTypes.func.isRequired,
  isAnimating: PropTypes.bool.isRequired,
  pattern: PropTypes.array.isRequired,
  reelTop: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  return {
    isEnd: state.game.isEnd,
    members: state.members.byId,
    isAnimating: state.slot.isAnimating,
    pattern: state.slot.pattern,
    reelTop: state.slot.reelTop
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    lottery: bindActionCreators(lottery, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer)
