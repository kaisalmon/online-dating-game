# Writing Scripts in Inkly
Each line is it's own message. Messages which begin with one or more ` * ` are messages by the player. This means they will appear as options for the player to click, and when they do they will send that message. All other lines are messages sent by the partner.

For example:
```
What's your favourite flower?
* Roses
* Lillies
* I'm not a fan of flowers really
```
Would mean that the match starts the conversation by asking "What's your favourite flower?" and then the player would have one of three options to choose. 

Putting text after the message will give the reply for each message, for example
For example:
```
What's your favourite flower?
* Roses
    I love Roses
* Lillies
    I'm not a big fan of Lillies, actually
* I'm not a fan of flowers really
    Oh, that's boring!
```
Now each possible message for the player has a reply.
You can think of this as tree that's splitting into 3 different branches. To split more branches we use more ` * `s the deeper we go:
```
What's your favourite flower?
* Roses
    I love Roses
* Lillies
    I'm not a big fan of Lillies, actually
* I'm not a fan of flowers really
    Oh, that's boring!
    ** I've just never liked flowers
    ** Hey I can like and dislike whatever I want
    ** ...sorry
```
Remember, everything with an `*` is a player reply. Now we can add the things the match says in response:
```
What's your favourite flower?
* Roses
    I love Roses
* Lillies
    I'm not a big fan of Lillies, actually
* I'm not a fan of flowers really
    Oh, that's boring!
    ** I've just never liked flowers
        I suppose I can understand that 
    ** Hey I can like and dislike whatever I want
        Waoh, sorry!
    ** ...sorry
        Don't be sorry!
```

So we've now got the situation where the branch splits into three, and then one of those branches splits into another three! 
If we want to reconnect the branches back again, we use `-` like so:

```
What's your favourite flower?
* Roses
    I love Roses
* Lillies
    I'm not a big fan of Lillies, actually
* I'm not a fan of flowers really
    Oh, that's boring!
    ** I've just never liked flowers
        I suppose I can understand that 
    ** Hey I can like and dislike whatever I want
        Waoh, sorry!
    ** ...sorry
        Don't be sorry!
 - But my favourite flower is Daffodils 
```
If you think of each choice the player makes as getting one level deeper, that ` - ` brings you back up to "level one".
