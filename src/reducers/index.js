import {
  COUNT_UPDATE,
  FILTER_TIME,
  HASHTAGS_SET,
  LANG_COUNTS_UPDATE,
  MOVE_MAP,
  QUERIES_UPDATE,
  SELECTED_LANG_UPDATE,
  TOGGLE_TWEET_BAR,
  TWEETS_APPEND,
  TWEETS_SET,
  VIEW_URL_UPDATE
} from "../actions"

const initialState = {
  mapCenter: [0, 0],
  mapZoom: 1,
  timeBounds: null,
  queryTerms: [],
  selectedLangs: [],
  langCounts: [],
  tweets: [],
  hashtags: [],
  totalTweets: 0,
  tweetBarMode: "hashtag",
  viewUrl: "#"
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
  case MOVE_MAP:
    return Object.assign({}, state, {
      mapZoom: action.zoom,
      mapCenter: action.center
    })
  case FILTER_TIME:
    return Object.assign({}, state, {
      timeBounds: action.times
    })
  case LANG_COUNTS_UPDATE:
    return Object.assign({}, state, {
      langCounts: action.langCounts
    })
  case SELECTED_LANG_UPDATE:
    return Object.assign({}, state, {
      selectedLangs: action.selected
    })
  case QUERIES_UPDATE:
    return Object.assign({}, state, {
      queryTerms: action.queries
    })
  case COUNT_UPDATE:
    return Object.assign({}, state, {
      totalTweets: action.count
    })
  case TWEETS_SET:
    return Object.assign({}, state, {
      tweets: action.tweets
    })
  case TWEETS_APPEND:
    const tweets = state.tweets.concat(action.tweets)
    const tweet_ids = []

    /* filter for duplicates */
    const uniques = tweets.filter(tweet => {
      if (tweet_ids.includes(tweet.id)) {
        return false
      }
      tweet_ids.push(tweet.id)
      return true
    })

    return Object.assign({}, state, {
      tweets: uniques
    })
  case HASHTAGS_SET:
    return Object.assign({}, state, {
      hashtags: action.hashtags
    })
  case TOGGLE_TWEET_BAR:
    return Object.assign({}, state, {
      tweetBarMode: action.setting
    })
  case VIEW_URL_UPDATE:
    return Object.assign({}, state, {
      viewUrl: action.url
    })
  default:
    return state
  }
}
