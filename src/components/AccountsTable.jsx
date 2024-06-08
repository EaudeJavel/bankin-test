import React from "react";

const AccountsTable = ({ accounts, loading, error, token }) => {
  console.log("token", token);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <table className="p-8">
      <thead>
        <tr>
          <th className="p-4">Nom</th>
          <th>Solde</th>
        </tr>
      </thead>
      <tbody>
        {accounts &&
          accounts.map((account) => (
            <tr key={account.id}>
              <td className="p-4">{account.name}</td>
              <td className="text-right">
                {account.balance} {account.currency_code}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default AccountsTable;
