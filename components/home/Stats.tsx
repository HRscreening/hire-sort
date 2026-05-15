type StatProps = {
  value: string;
  label: string;
};

const Stat = ({ value, label }: StatProps) => (
  <div className="transition-transform hover:-translate-y-1.5">
    <h3 className="mb-1.5 font-mono text-[42px] font-extrabold tracking-[-1.5px] text-charcoal">
      {value}
    </h3>
    <p className="text-sm font-medium text-charcoal-lt">{label}</p>
  </div>
);

const Stats = () => {
  return (
    <section className="bg-linear-to-b from-ivory to-ivory-medium px-6 py-20">
      <div className="mx-auto grid max-w-250 grid-cols-2 gap-10 text-center md:grid-cols-4">
        <Stat value="90%" label="Less time screening" />
        <Stat value="15s" label="Avg. processing time" />
        <Stat value="50K+" label="Resumes processed" />
        <Stat value="500" label="uploads at once" />
      </div>
    </section>
  );
};

export default Stats;
