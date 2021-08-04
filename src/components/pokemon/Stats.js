import { formatStatName } from "../../helpers/typography";
import { typeToColor } from "../../helpers/typeToColor";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
const Stats = ({ stats, type }) => {
  const chartData = stats.map((stat) => ({
    stat: formatStatName(stat.stat.name),
    value: stat.base_stat,
  }));
  return (
    <ResponsiveContainer width="100%" height={500}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid stroke="#aaa" />
        <PolarAngleAxis dataKey="stat" strokeOpacity={0.01} stroke="#666" />

        <PolarRadiusAxis stroke="#aaa" angle={30} />
        <Radar
          name="baseStat"
          dataKey="value"
          fill={typeToColor(type)}
          fillOpacity={0.6}
          isAnimationActive={false}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default Stats;
