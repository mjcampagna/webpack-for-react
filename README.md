# Webpack

I've read a lot of articles about Webpack. The best of them are dated, now irrelevant. The rest of them are simply insane.

I am recently come to Webpack, and it frustrated me at first. In most reading, the author steers one into brambles, then gives band-aids to dress the wounds. There's a thing called tech debt, and the answer to most problems is not to install still more npm modules; better to avoid the pitfalls in the first place.

And that's the point of this. Herein, I do not endeavor to be comprehensive. Rather, I will plot a sane introduction to Webpack, building a base configuration that leans heavily on first-party resources. As little bloat as I can manage, nothing nonessential, and reaching only for third-parties when I absolutely must.

First and foremost, I write this for myself, a living document that I will update as my needs and my understanding continue to evolve. If others benefit from it as well, then all the better. 

If you're coming then, strap on your Webpack and let's start walking.

----

At time of writing, Webpack 4.8.3 is current. This article assumes some familiarity with [Node.js](https://nodejs.org/) and npm, and with setting up a new project folder or repository.

If you're here for the first time, I strongly advise reading the entire article. Repeat visitors might like to jump to the final code.

----
