import { BsFillArrowDownSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { API } from '../../config/Api';

const TransactionsTab = (props) => {
  let { data: transactions, isLoading: movieOnLoad } = useQuery('transactionsCache', async () => {
    const response = await API.get('/transactions');
    return response.data.data;
  });

  return (
    <div className={`${props.className} bg-slate-700 rounded-md`}>
      <div className="flex justify-between pb-5">
        <h1 className="font-bold text-xl text-white">Latest Transactions</h1>
        <button>
          <BsFillArrowRightSquareFill size={26} className="text-white" />
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-slate-900 uppercase bg-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                Users
              </th>
              <th scope="col" className="px-6 py-3">
                Remaining Active
              </th>
              <th scope="col" className="px-6 py-3">
                User Status
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((trans) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {trans.user.fullname}
                  </th>
                  <td className="px-6 py-4">24/30</td>
                  <td className="px-6 py-4">{trans.user.subscribe ? <span>Active</span> : <span>Unactive</span>}</td>
                  <td className="px-6 py-4">{trans.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTab;
