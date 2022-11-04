import 'swiper/swiper.min.css'
import '@ionic/react/css/ionic-swiper.css'

import React, { useEffect, useState } from 'react'
import { IonContent, IonFooter, IonPage } from '@ionic/react'
import { SettingsClient } from '@team_eureka/eureka-ionic-core'
import i18n from '@team_eureka/eureka-ionic-core/lib/i18n'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'

import locales from './locales'
import './index.sass'

import { XGrid, XSpace, XDots, XButtonNext, XImage, XText } from '@ramenx/ui-library'
import OnboardingDummy from '../../assets/img/onboarding/dummy.svg'

const colorGray = 'rgba(0,0,0,0.6)'
const colorGradientBlue =
  'linear-gradient(74.39deg, #0A1FBA 0%, #2D66F6 48.96%, #4BAAF9 100%)'
interface IProps {
  onBoardingCompleted: () => void
}

const OnBoardingPage: React.FC<IProps> = (props) => {
  const localize = i18n(locales)

  const [swiper, setSwiper] = useState<any>()

  const [pageStates, setPageStates] = useState({
    mode: 'INITIAL_STATE',
    slideIndex: 0
  })

  useEffect(() => {
    console.log('Onboarding')
  }, [])

  const { slideIndex } = pageStates

  const onGetSwiperHandler = (e: any) => {
    setSwiper(e)
  }

  const onEndOndboarding = async () => {
    await SettingsClient.set('FIRST_TIME', false)
    props.onBoardingCompleted()
  }

  const onChangeHandler = () => {
    if (slideIndex === 2) {
      onEndOndboarding()
    }
    swiper!.slideNext()
  }

  return (
    <IonPage>
      <IonContent>
        {/* Swiper slide with three screen with a dummy header imagen and dummy text
        -- Change text on 'locales' folder */}
        <Swiper
          onInit={onGetSwiperHandler}
          initialSlide={0}
          speed={400}
          onSlideChange={(e) =>
            setPageStates({ ...pageStates, slideIndex: e.activeIndex })
          }
        >
          <SwiperSlide className='onboarding'>
            <div className='content'>
              <XGrid type='column' justify='center'>
                <XSpace level='6' />
                <XImage src={OnboardingDummy} width='85' />
                <XSpace level='10' />

                <XText level='5' background={colorGradientBlue}>
                  {localize('dummy_title1', '')}
                </XText>
                <XText level='9' leading='title' background={colorGray}>
                  {localize('dummy_description1', '')}
                </XText>
              </XGrid>
            </div>
          </SwiperSlide>
          <SwiperSlide className='onboarding'>
            <div className='content'>
              <XGrid type='column' justify='center'>
                <XSpace level='6' />
                <XImage src={OnboardingDummy} width='85' />
                <XSpace level='10' />

                <XText level='5' background={colorGradientBlue}>
                  {localize('dummy_title2', '')}
                </XText>
                <XText level='9' leading='title' background={colorGray}>
                  {localize('dummy_description2', '')}
                </XText>
              </XGrid>
            </div>
          </SwiperSlide>
          <SwiperSlide className='onboarding'>
            <div className='content'>
              <XGrid type='column' justify='center'>
                <XSpace level='6' />
                <XImage src={OnboardingDummy} width='85' />
                <XSpace level='10' />

                <XText level='5' background={colorGradientBlue}>
                  {localize('dummy_title3', '')}
                </XText>
                <XText level='9' leading='title' background={colorGray}>
                  {localize('dummy_description3', '')}
                </XText>
              </XGrid>
            </div>
          </SwiperSlide>
        </Swiper>
      </IonContent>
      <IonFooter>
        <XGrid boundaries='xlarge' justify='between'>
          <XDots count={3} current={slideIndex} />
          <XButtonNext onClick={() => onChangeHandler()} />
        </XGrid>
      </IonFooter>
    </IonPage>
  )
}

export default OnBoardingPage
