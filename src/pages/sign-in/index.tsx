import 'swiper/swiper.min.css'
import '@ionic/react/css/ionic-swiper.css'

import { IonContent, IonFooter, IonPage } from '@ionic/react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import i18n from '@team_eureka/eureka-ionic-core/lib/i18n'
import OtpSignIn from './components/otp'
import locales from './locales'
import './index.sass'

import { XButtonLogin, XLink, XText, XSpace, XGrid, XImage } from '@ramenx/ui-library'
import LoginHeader from '../../assets/img/onboarding/graphic.svg'

const colorGray = 'rgba(0,0,0,0.6)'
const colorGradientBlue =
  'linear-gradient(74.39deg, #0A1FBA 0%, #2D66F6 48.96%, #4BAAF9 100%)'

const SignInPage: React.FC = () => {
  const localize = i18n(locales)
  return (
    <IonPage className='signin-page'>
      <IonContent>
        <Swiper initialSlide={0} speed={400}>
          <SwiperSlide className='sign-in'>
            <div className='content'>
              <XGrid type='column' justify='center'>
                <XImage src={LoginHeader} shape='none' width='100' />
                <XSpace level='10' />

                <XText level='5' background={colorGradientBlue}>
                  {localize('LOGIN_TITLE', '')}
                </XText>
                <XText level='9' leading='title' background={colorGray}>
                  {localize('LOGIN_SUBTITLE', '')}
                </XText>
              </XGrid>
            </div>
          </SwiperSlide>

          {/* Sign in with OTP model */}
          <SwiperSlide className='application-otp-login'>
            <OtpSignIn />
          </SwiperSlide>
        </Swiper>
      </IonContent>
      <IonFooter>
        <XButtonLogin
          size='large'
          type='otp'
          onClick={() => console.log('action')}
        >
          {localize('LOGIN_WITH_EMAIL', '')}
        </XButtonLogin>
        <XButtonLogin
          size='large'
          type='google'
          onClick={() => console.log('action')}
        >
          {localize('LOGIN_WITH_GOOGLE', '')}
        </XButtonLogin>
        <XButtonLogin
          size='large'
          type='apple'
          onClick={() => console.log('action')}
        >
          {localize('LOGIN_WITH_APPLE', '')}
        </XButtonLogin>
        <XLink
          size='large'
          onClick={() => {
            console.log('call to action')
          }}
        >
          {localize('LOGIN_WITH_INVITE', '')}
        </XLink>
        <XSpace level='8' />
      </IonFooter>
    </IonPage>
  )
}

export default SignInPage
