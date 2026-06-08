import ToolDetailPage, { buildToolDetailMetadata } from '../_components/ToolDetailPage';
import { getToolDetailBySlug } from '../_data/details';

const tool = getToolDetailBySlug('generate-rubric')!;

export const metadata = buildToolDetailMetadata(tool);

export default function GenerateRubricToolPage() {
  return <ToolDetailPage tool={tool} />;
}
