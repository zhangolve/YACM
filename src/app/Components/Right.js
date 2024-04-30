import dynamic from 'next/dynamic'
import Card from '@/commons/Card'
const AccountCard = dynamic(() => import('@/commons/AccountCard'), { ssr: false })


const Right = ()=> {
    return (
        <div className="right">
            <h2>Right</h2>
            <div className="balance">
                <Card />
            </div>
            <div className="accounts py-2">
                <AccountCard />
            </div>
        </div>
    )
}

export default Right;