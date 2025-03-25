import "../styles/InputAccountInfo.css";
import { Check, Pencil } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useRefresh } from "../contexts/RefreshProvider";

interface InputAccountInfoProps {
  column: string;
  value: string | number | undefined;
  id: string;
  type: string;
}

export default function InputAccountInfo({
  id,
  column,
  value,
  type,
}: InputAccountInfoProps) {
  const [newValue, setNewValue] = useState<string | number>();
  const [isEditing, setIsEditing] = useState(false);
  const { auth } = useAuth();
  const { refresh, setRefresh } = useRefresh();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setNewValue(e.target.value);
  };

  const handleEdit = () => {
    setNewValue(value);
    setIsEditing(true);
  };

  const handleValidate = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${auth?.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key: column, value: newValue }),
        },
      );

      if (response.ok) {
        setIsEditing(false);
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isEditing ? (
        <div className="account-info-value-container active">
          {type === "sex" ? (
            <>
              <select
                id={id}
                className="account-info-value"
                value={newValue}
                onChange={handleChange}
              >
                <option value="">--</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
              <Check className="account-info-img" onClick={handleValidate} />
            </>
          ) : (
            <>
              <input
                type={type}
                className="account-info-value"
                value={newValue}
                id={id}
                onChange={handleChange}
              />
              <Check className="account-info-img" onClick={handleValidate} />
            </>
          )}
        </div>
      ) : (
        <div className="account-info-value-container">
          <p>
            {type === "date"
              ? value?.toString().split("-").reverse().join("/")
              : value}
          </p>
          <Pencil className="account-info-img" onClick={handleEdit} />
        </div>
      )}
    </>
  );
}
