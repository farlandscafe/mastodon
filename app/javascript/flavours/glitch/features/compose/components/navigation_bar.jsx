import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';

import { Permalink } from 'flavours/glitch/components/permalink';
import { profileLink } from 'flavours/glitch/utils/backend_links';

import { Avatar } from '../../../components/avatar';

import ActionBar from './action_bar';

export default class NavigationBar extends ImmutablePureComponent {

  static propTypes = {
    account: ImmutablePropTypes.record.isRequired,
    onLogout: PropTypes.func.isRequired,
    onClose: PropTypes.func,
  };

  render () {
    const displayNameHtml = { __html: this.props.account.get('display_name_html') };

    let badge;

    if (this.props.account.get('bot')) {
      badge = (<div className='account-role bot'><FormattedMessage id='account.badges.bot' defaultMessage='Automated' /></div>);
    } else if (this.props.account.get('group')) {
      badge = (<div className='account-role group'><FormattedMessage id='account.badges.group' defaultMessage='Group' /></div>);
    } else {
      badge = null;
    }

    const username = this.props.account.get('acct');

    return (
      <div className='navigation-bar'>
        <Permalink className='avatar' href={this.props.account.get('url')} to={`/@${username}`}>
          <span style={{ display: 'none' }}>{username}</span>
          <Avatar account={this.props.account} size={46} />
        </Permalink>

        <div className='navigation-bar__profile'>
          <span>
          <Permalink className='acct' href={this.props.account.get('url')} to={`/@${username}`}>
            <strong dangerouslySetInnerHTML={displayNameHtml} /> {badge} <span style={{ fontWeight: 400, color: '#c2cede' }}>@{username}</span>
          </Permalink>
          </span>

          { profileLink !== undefined && (
            <a
              className='edit'
              href={profileLink}
            ><FormattedMessage id='navigation_bar.edit_profile' defaultMessage='Edit profile' /></a>
          )}
        </div>

        <div className='navigation-bar__actions'>
          <ActionBar account={this.props.account} onLogout={this.props.onLogout} />
        </div>
      </div>
    );
  }

}
