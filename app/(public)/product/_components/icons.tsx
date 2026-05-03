import {
  Briefcase,
  Database,
  UserSearch,
  Layers,
  Sparkles,
  ListChecks,
  RefreshCcw,
  Filter,
  GanttChart,
  FileText,
  Tags,
  Workflow,
  CheckCircle2,
  XCircle,
  Rocket,
  Building2,
  Users,
  HandCoins,
  GitCompare,
  ClipboardCheck,
  Shield,
  Clock,
  Search,
  FileSearch,
  FileScan,
} from 'lucide-react';
import type { IconName } from '@/app/(public)/product/_lib/types';

const map = {
  briefcase: Briefcase,
  database: Database,
  userSearch: UserSearch,
  layers: Layers,
  sparkles: Sparkles,
  listChecks: ListChecks,
  refreshCcw: RefreshCcw,
  filter: Filter,
  ganttChart: GanttChart,
  fileText: FileText,
  tags: Tags,
  workflow: Workflow,
  checkCircle: CheckCircle2,
  xCircle: XCircle,
  rocket: Rocket,
  building: Building2,
  users: Users,
  handCoins: HandCoins,
  gitCompare: GitCompare,
  clipboardCheck: ClipboardCheck,
  shield: Shield,
  clock: Clock,
  search: Search,
  fileSearch: FileSearch,
  fileScan: FileScan,
} as const;

export const Icon = ({ name, size = 18 }: { name?: IconName; size?: number }) => {
  if (!name) return null;
  const Cmp = map[name];
  if (!Cmp) return null;
  return <Cmp size={size} strokeWidth={2.2} />;
};
