import './App.css';
import TwitterFollowCard from './TwitterFollowCard';

const users = [
    {
        userName: 'Alvaro__cordoba',
        name: 'Alvaro Cordoba',
        initialIsFollowing: true
    },
    {
    
          userName: 'julianarosero96',
            name: 'Rosero Cordoba',
            initialIsFollowing: true
    },
    {
    
        userName: 'elonmusk',
          name: 'Elon musk',
          initialIsFollowing: false
  }
]



export default function App(){
   
   
    return(
     <>
     {
        users.map(user => {
            return (
                <TwitterFollowCard
                key={user.userName} 
                userName={user.userName}
                initialIsFollowing={user.initialIsFollowing}
                name={user.name}

                />
            )
        } )
     }
     
     </>
    )
}