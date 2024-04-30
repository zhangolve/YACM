
import Table from '@/commons/Table'
import { useWallet, networkToColor, useOnlineWallet } from '@/utils' 

const ColoredNetwork = ({network}) => {
    return (
        <div class="h-2 w-2 rounded-full mr-2 inline-block" style={{background: networkToColor[network]?? 'black'}}></div>
    )
}
const columns = [{name: 'label'}, {name: 'address'},{name: 'network', render: (value)=><><ColoredNetwork network={value} /><span>{value}</span></>},{name: 'value'}]



const AccountCard = ()=> {
    const [wallets, connectWallet] = useWallet()
    const onlineWallet = useOnlineWallet()
    return (
    <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden card">
        <h2>Accounts</h2>
            <div>
                <button className="btn rounded-x2 shadow-md p-4" onClick={connectWallet}>Add Account</button>
            </div>
            <Table {...{columns, dataSource: wallets}} />
    </div>
    )
}



export {AccountCard}

export default AccountCard