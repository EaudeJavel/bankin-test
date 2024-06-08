import "./index.css";
import React, { useState, useEffect } from "react";
import AccountsTable from "./components/AccountsTable";
import TopBar from "./components/partials/TopBar";
import Button from "./components/partials/Button";
import axios from "axios";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [isSoldeHidden, setIsSoldeHidden] = useState(false);

  // Step 2 function to calculate all soldes
  const calculateAllSoldes = (accounts) => {
    // reduce accounts array to balance values
    const total = accounts.reduce((acc, account) => acc + account.balance, 0);
    // return the nearest hundred.
    return Math.ceil(total / 100) * 100;
  };

  // Fetch token and auth
  // Get accounts using auth token
  useEffect(() => {
    const fetchTokenAndAccounts = async () => {
      try {
        // auth to get token
        const authResponse = await axios.post(
          "http://localhost:3000/authenticate",
          {
            email: "user1@mail.com",
            password: "a!Strongp#assword1",
          }
        );
        setToken(authResponse.data.access_token);

        // Fetch accounts
        const accountsResponse = await axios.get(
          "http://localhost:3000/accounts"
        );
        setAccounts(accountsResponse.data.resources);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTokenAndAccounts();
  }, []);

  return (
    <div className="App px-96">
      <TopBar />
      {isSoldeHidden ? (
        <div className="flex justify-center items-center gap-2">
          <p className="text-2xl p-6">Votre solde est désormais caché.</p>
        </div>
      ) : (
        <AccountsTable
          accounts={accounts}
          loading={loading}
          error={error}
          token={token}
        />
      )}

      <div className="flex flex-col items-center gap-2">
        <Button onClick={() => calculateAllSoldes(accounts)}>
          Optimiser mon épargne
        </Button>
        <Button onClick={() => setIsSoldeHidden((prev) => !prev)}>
          {isSoldeHidden ? "Afficher mon solde" : "Cacher mon solde"}
        </Button>
      </div>
    </div>
  );
}

export default App;
