import ToolDetailPage, { buildToolDetailMetadata } from '../_components/ToolDetailPage';
import { getToolDetailBySlug } from '../_data/details';

const tool = getToolDetailBySlug('interview-questions-generator')!;

export const metadata = buildToolDetailMetadata(tool);

export default function InterviewQuestionsGeneratorPage() {
  return <ToolDetailPage tool={tool} />;
}
