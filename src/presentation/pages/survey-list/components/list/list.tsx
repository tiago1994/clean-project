import React, { useContext } from 'react'
import Styles from './list.styles.scss'
import { SurveyItem, SurveyItemEmpty, SurveyContext } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {state.surveys.length
        ? state.surveys.map((survey: LoadSurveyList.Model) => <SurveyItem survey={survey} key={survey.id} />)
        : <SurveyItemEmpty />}
    </ul>
  )
}

export default List
