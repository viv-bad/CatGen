import { useOne } from "@pankod/refine-core";
import { useParams } from "@pankod/refine-react-router-v6";
import { Profile } from "components";

const ResearcherProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });

  const myProfile = data?.data ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <Profile
        type="Agent"
        name={myProfile.name}
        email={myProfile.email}
        avatar={myProfile.avatar}
        properties={myProfile.allProperties}
      />
    </div>
  );
};

export default ResearcherProfile;
