import ToolDetailPage, { buildToolDetailMetadata } from '../_components/ToolDetailPage';
import { getToolDetailBySlug } from '../_data/details';

const tool = getToolDetailBySlug('job-description-generator')!;

export const metadata = buildToolDetailMetadata(tool);

export default function JobDescriptionGeneratorToolPage() {
  return <ToolDetailPage tool={tool} />;
}
