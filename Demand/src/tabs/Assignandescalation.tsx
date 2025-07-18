import React, { useState } from 'react';
import { Card } from '../components/Card';
import TopHead from '../components/TopHead';
import AddRule from '../forms/Addrule';

const mainColumns = [
  { label: 'Category', align: 'left' as const },
  { label: 'Sub Category', align: 'left' as const },
  { label: 'Status', align: 'left' as const },
];

const subColumns = [
  { label: 'Level', align: 'left' as const },
  { label: 'Escalation To', align: 'left' as const },
  { label: 'Hours', align: 'left' as const },
];

const AssignAndEscalation = () => {
  const [rules, setRules] = useState<any[]>([]);

  const handleAddRule = (rule: any) => {
    setRules([...rules, rule]);
  };

  return (
    <Card className="p-8">
      <AddRule onAddRule={handleAddRule} />

      <div className="mt-6 mb-2 text-lg font-semibold">Rule</div>

      {rules.length === 0 ? (
        <Card className="p-4 border border-gray-300">
          <div className="text-gray-500 text-center">No rules added yet.</div>
        </Card>
      ) : (
        rules.map((rule, idx) => (
          <Card key={idx} className="p-4 mt-4 border border-gray-300">
            <div className="font-semibold mb-2">Rule #{idx + 1}</div>

            <table className="w-full mb-2">
              <TopHead columns={mainColumns} />
              <tbody>
                <tr>
                  <td className="border px-3 py-2 bg-gray-100 font-medium">{rule.category}</td>
                  <td className="border px-3 py-2 bg-gray-100 font-medium">{rule.subCategory}</td>
                  <td className="border px-3 py-2 bg-gray-100 font-medium">{rule.status}</td>
                </tr>
              </tbody>
            </table>

           <table className="w-full mt-3">
  <TopHead columns={subColumns} />
  <tbody>
    <tr>
      <td className="border px-3 py-2 bg-gray-100 font-medium">{rule.level}</td>
      <td className="border px-3 py-2 bg-gray-100 font-medium">{rule.escalationTo}</td>
      <td className="border px-3 py-2 bg-gray-100 font-medium">{rule.hours}</td>
    </tr>
  </tbody>
</table>
          </Card>
        ))
      )}
    </Card>
  );
};

export default AssignAndEscalation;
