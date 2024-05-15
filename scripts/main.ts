const sum = (n1: number, n2: number): number => n1+n2
function say(things: string): void {
	console.log(things)
}
say('The sum (1+2) is: ' + sum(1, 2).toString())
