import React, { useContext } from 'react'
import Styles from './item.styles.scss'
import { SurveyModel } from '@/domain/models'
import { SurveyItem, SurveyItemEmpty, SurveyContext } from '@/presentation/pages/survey-list/components'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {state.surveys.length
        ? state.surveys.map((survey: SurveyModel) => <SurveyItem survey={survey} key={survey.id} />)
        : <SurveyItemEmpty />}
    </ul>
  )
}

export default List