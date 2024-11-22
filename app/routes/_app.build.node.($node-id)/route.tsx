import { useParams } from "@remix-run/react";

export default function NodeProperties() {
  const params = useParams();

  console.log(params);
  return <div>node properties</div>;
}
