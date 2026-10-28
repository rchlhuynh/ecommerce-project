import './NotFoundPage.css'
import { Header } from '../components/Header'

export function NotFoundPage({ cart }) {
    return (
        <>
        <title>404 Page Not Found</title>
            <div className="header">
                <Header cart={cart} />
                <div className="not-found-message">Page not found</div>
                
            </div>
        </>
            
    )
}