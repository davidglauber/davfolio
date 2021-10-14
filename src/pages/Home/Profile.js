import { lazy, Fragment, Suspense } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import Link from 'components/Link';
import { Button } from 'components/Button';
import DecoderText from 'components/DecoderText';
import Divider from 'components/Divider';
import Section from 'components/Section';
import Heading from 'components/Heading';
import Text from 'components/Text';
import { ReactComponent as KatakanaProfile } from 'assets/katakana-profile.svg';
import { reflow, isVisible } from 'utils/transition';
import prerender from 'utils/prerender';
import './Profile.css';

const Portrait = lazy(() => import('components/Portrait'));

const ProfileText = ({ status, titleId }) => (
  <Fragment>
    <Heading
      className={classNames('profile__title', `profile__title--${status}`)}
      level={3}
      id={titleId}
    >
      <DecoderText text="Hi there" start={status !== 'exited'} delay={500} />
    </Heading>
    <Text
      className={classNames('profile__description', `profile__description--${status}`)}
      size="l"
    >
      I'm David Glauber, a dedicated designer & developer with a focus on mobile things and user
      experience. My projects include Figma UI/UX, Mobile Responsivity, Database... In other words: Development.
    </Text>
    <Text
      className={classNames('profile__description', `profile__description--${status}`)}
      size="l"
    >
      This portfolio is a selection of my featured and most recent work. I'm always interested in
      new projects, so feel free to drop me a line.
    </Text>
  </Fragment>
);

const Profile = ({ id, visible, sectionRef }) => {
  const titleId = `${id}-title`;

  return (
    <Section
      className="profile"
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible} timeout={0} onEnter={reflow}>
        {status => (
          <div className="profile__content">
            <div className="profile__column">
              <ProfileText status={status} titleId={titleId} />
              <Button
                secondary
                className={classNames('profile__button', `profile__button--${status}`)}
                href="/contact"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className="profile__column">
              <div className="profile__tag" aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={status !== 'entered'}
                  collapseDelay={1000}
                />
                <div
                  className={classNames(
                    'profile__tag-text',
                    `profile__tag-text--${status}`
                  )}
                >
                  About Me
                </div>
              </div>
              <div className="profile__image-wrapper">
                {!prerender && (
                  <Suspense fallback={null}>
                    <Portrait
                      noStyle
                      show={isVisible(status)}
                      className={classNames(
                        'profile__image',
                        `profile__image--${status}`
                      )}
                      delay={100}
                    />
                  </Suspense>
                )}
                <KatakanaProfile
                  className={classNames('profile__svg', `profile__svg--${status}`)}
                />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};

export default Profile;
