import ToolDetailPage, { buildToolDetailMetadata } from '../_components/ToolDetailPage';
import { getToolDetailBySlug } from '../_data/details';

const tool = getToolDetailBySlug('hiring-analytics-spreadsheet')!;

export const metadata = buildToolDetailMetadata(tool);

export default function HiringAnalyticsSpreadsheetPage() {
  return <ToolDetailPage tool={tool} />;
}

