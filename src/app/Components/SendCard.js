import Card from "../commons/Card";
import { useRouter } from "next/navigation";

const BalanceCard = () => {
  const router = useRouter();
  return (
    <Card
      title={"Send"}
      content="Send your assets from your account to another account"
      onClick={() => {
        router.push("/send");
      }}
    />
  );
};

export default BalanceCard;
