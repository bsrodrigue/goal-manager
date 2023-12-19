import { IGoal } from "../../../types";

interface GoalListProps {
  goals: IGoal[]
  onClickItem: (item: IGoal) => void;
}

export default function GoalList({ goals, onClickItem }: GoalListProps) {
  return (
    <ul className="my-5">
      {
        goals.map((goal) => (
          <li
            onClick={() => {
              onClickItem(goal);
            }}
            className="ml-5 list-disc hover:cursor-pointer">
            {goal.title}
          </li>
        ))
      }
    </ul>
  )
}
