import ToolDetailPage, { buildToolDetailMetadata } from '../_components/ToolDetailPage';
import { getToolDetailBySlug } from '../_data/details';

const tool = getToolDetailBySlug('resume-screening')!;

export const metadata = buildToolDetailMetadata(tool);

export default function ResumeScreeningToolPage() {
  return <ToolDetailPage tool={tool} />;
}
