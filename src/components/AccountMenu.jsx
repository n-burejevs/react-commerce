import '../styles/AccountMenuStyles.css';

export default function AccountMenu()
{
    return(
        <>
        <div className="mobile-account-menu">
              <div className="account-menu-mobile-container">
            <div className="account-menu-item" id="active" >Profile</div>
            <div className="account-menu-item" id="not-active">Order history</div>
            <div className="account-menu-item" id="not-active">Viewed products</div>
        </div>
        </div>
      
        <div className="account-menu-container">
            <div className="account-menu-item">Profile</div>
            <div className="account-menu-item">Order history</div>
            <div className="account-menu-item">Viewed products</div>
        </div>
        </>
    )
}