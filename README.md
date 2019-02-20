# Tank Wars

Front end created with React Native, connecting to a Rails backend. 

Has authentication capability, can play a Tank turn-based game with yourself, locally via screen share, or against other players.

- Built-in JS earth physics machine to caclualate velocity and position updates, as well as collisions
- Save game state to backend so you can stop mid-game and come back later

To contribute
- Look at the dev branch to see which next steps have been taken which are not part of the site yet
- If you want to add something, clone the dev branch and bundle install to get it working. Submit a pull request when finished. Next steps are making remote games work, and using websocket connections instead of http polling