import DemoPageView from '../../_components/panelView'
import SampleRubric from "../../_sample_data/sample-rubric.json";
import SampleResume from "../../_sample_data/scored_resume.json";
import type { Rubric, ScoredResume } from "../../types";


const Page = () => {
  return (
    <DemoPageView
      rubric={SampleRubric as Rubric}
      resume={SampleResume as ScoredResume}
      sessionId="sample"
    />
  )
}

export default Page
