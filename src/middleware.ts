import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const SPAM_PATTERNS = [
  /paribahis/i,
  /mostbet/i,
  /casino/i,
  /gambling/i,
  /betting/i,
  /poker/i,
  /slot-machine/i,
  /roulette/i,
  /blackjack/i,
  /baccarat/i,
  /craps/i,
  /bingo/i,
  /lottery/i,
  /sweepstake/i,
  /bookmaker/i,
  /sportsbook/i,
  /wager/i,
  /free-live-r/i,
  /excitement-of-playing/i,
  /vulkan/i,
  /1xbet/i,
  /melbet/i,
  /pin-up/i,
  /pinup/i,
  /joycasino/i,
  /play-fortuna/i,
  /azino/i,
  /riobet/i,
  /favbet/i,
  /marathonbet/i,
  /leonbet/i,
  /betwinner/i,
  /stavka/i,
  /oyna/i,
  /oyun/i,
  /bahis/i,
  /kazino/i,
  /ruletka/i,
  /igrovye/i,
  /avtomaty/i,
  /besplatno/i,
  /skachat/i,
  /zerkalo/i,
  /giris/i,
  /giriş/i,
  /registratsiya/i,
  /bonuses/i,
  /promo-code/i,
  /promokod/i,
  /vedushchie/i,
  /luchshie/i,
  /obzor/i,
  /bez-depozita/i,
  /na-dengi/i,
  /na-realnye/i,
  /krupye/i,
  /live-dealer/i,
  /croupier/i,
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(pathname)) {
      return new NextResponse("Not Found", {
        status: 404,
        headers: { "content-type": "text/plain" },
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
}
