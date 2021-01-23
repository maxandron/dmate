function getWidget() {
    let widgetHtml = `
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/fontawesome.css">
    <!--<span class="dmate-name">DMate:</span>-->
    <img style="width:38px;margin-right:8px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7d15eFT1vT/w9+fMTBISdtkSEDdc2WzRurZuuNe2tsWqBOyqt72X1rbgQlDnVoJL1Vrbn/fW3i5KUKtdrFUrAhVbq7buLK6oKJgAsglknZnz+f0htDESSDIz5/M957xfz3Of57ZXc95cTs6857sdgIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIjIXWIdgIgKZ9S0h/qWlZbsDeie4slwKIZDdU+I9AfQD4J+UO2vQD+BJD76EzQDYBugzRCvBaqbAFkD6HsiaIBibU5kVQKJ15dcf/y7gGjAf0QiKhAWAKIQGp2+pwRbB46XhD/BAw5WxcEADgZkRIAxWgC8DsgKAEuh+pyfwPPLrzv5nQAzEFEPsQAQhcDBFz9cmSxJngjFUQr/cIEcCqDEOlcnNqjiGRE87nlY3NiUeXrFT85otQ5FRB/GAkDkoHHT51covIkQnATgJACHWGfKQ7MATwG60FfvgWU3TFxiHYiIWACInDHh+48OavWynwHkcwKdCKCXdabikJVQfUBF/zSoIvWXxekTstaJiOKIBYDI0Oj0o70TjdnPKzAVwPEAdrIwL9LWQXEPIHcuveGkp7iokCg4LABEgVMZN/2RE3zxLhDF5yHobZ3IEW8C+FU2k/vFyzef1mAdhijqWACIAnLgJY/3KUHLeVCdBmCMdR6H5QT4s6r8eOkNJy3iqABRcbAAEBXZ2MsW7ousfheCqQD6WucJmWUqen3p5oF3P3vbYRnrMERRwgJAVCRjZizaT+BfAuCrAJLWecJMgLcB/VGqovXnz6bParLOQxQFLABEBTZu+vwxKokrAf0CAM86T8SsE+icppbs//JsAaL8sAAQFcj47y4a7if9KwF8DfFbzR+0VRCZvUd54pfcRkjUMywARHmacOmCfpmcXqoiFyOye/ddpcuh3sVLb5i40DoJUdiwABDlYdz0+WepyK0Bn8FPHQjwgJfITnvh2tNXWmchCgsWAKIeGHfJXw5U9W8F9ETrLPQvTaKYk9oy4HruGCDaPRYAom6YcOEzqUz/TTWquAxAqXUe2gmVFz1fv/LiTSc/bx2FyGUsAERdNP7Sv4z21b8dqhOss9BuZaFyY3Nr21XcLUC0cywARLsxadI9iVf2Hvh9QH8AfusPmyUqOHfZ9Se/bB2EyDUsAES7cPDFD1cmU4k78cGLeiicmlTl28tumPgL6yBELmEBIOrEuOnzT1Tx7gQw1DoL5U9F725pzl604idnbLHOQuQCFgCijtJpb+y2Y2sgehV4oE/UvArf/9zSG099xToIkTUWAKJ2xk2fX6GSmAvo2dZZqGi2QmTq0usn3mcdhMgSzykn2m7M9+bvCfEe54d/5PWB6u/GXLLwckD5JYhiizc/EYBx0+cfoeLdB2CYdRYK1C/3qEhexPcJUByxAFDsjZ3xyBmA3Aug3DoLWdAFbVL+hVevP3ardRKiIHEKgGJt7PQF5wNyH/jhH2NyckqbFn7s8ocGWychChJHACi2xs1Y8E0FfgoWYfrAq0nRE5+//pR66yBEQeCDj2Jp3CULZihwK/g7QP92YFblL+O/u2i4dRCiIHAEgGJn3PQFF6vgR9Y5yFWyUjR34pIbTn3LOglRMbEAUKyMmb7w2yJ6M3jv06694SN57PIfnrDGOghRsXD4k2Jj7PSFF/HDn7poPw/Z+Yde/Gh/6yBExcIHIcXCuOnzz1Lx/gAe7Uvd85SoP3HJDac2WgchKjSOAFDkjZ2+8CgV7zfghz9135Eq3j3Hpx9NWgchKjQWAIq0MTMW7QfR+wD0ss5CoXXGhsbsTdYhiAqNBYAia+xlDwwQ9R8GMMQ6C4XetHGXLPyWdQiiQmIBoGhKpz34JfMgGGUdhaJBVW8ZM33BmdY5iAqFBYAiaWzj0ddA5XTrHBQpCRGZO276/H2sgxAVAgsARc6YGQu/BMgM6xwURTpAvcS9o6Y9VGqdhChfLAAUKWNmLNpPoLeBW1ypWFQnlJWleJIkhR4LAEXGhAufSQn8uwD0tc5C0SbAN8fNeOQ86xxE+eC3JIqMsTMeuQ6QS6xzdGafwaU47uC+OHRkOfYbUoY+vRIoTQq2tfhQKBo2Z/BqQwtebWjB029uxTsb2qwjF4QnglFDSzFuz3KMG1mOvQaVol+vBPqVJ1CSEDS2+djanEPD5ja8s6ENS1c348V3mlC/yfk///tZ3xv/8o0nvW0dhKgnWAAoEsZNn3+iircADo5qTdinN75x/GCMH1nerX/vlfpmPLLsfTz4wmZsac4VKV3xDB9QgtPH98MZ4/ujsn9Jt//919a0YMGyzfjT85vxfpOrf375y9KKx09GOu1bJyHqLhYACr1x0+dXqHhLAOxrnaW9yv4lmHbKUJxwcH4zEo2tOfzmqY2466n12Nbi/ufMyD1KcOEJQ3DiIf0gBXjCtGYVDzy/Eb/663ps2JbN/wcWmCi+u+SGk2+2zkHUXSwAFHpjZyy4BcA06xztnTG+Py45swqlqcL9im1r8fHThWtw/3OboFqwH1sw/Xol8K2Jw3Dmof2Q8Ar/aGlu8/F/i9/D3f/YAN936v8BzSKJjy25/sRXrYMQdQcLAIXa2OkLj4Lo43Bk6D+ZEHz7lGGY9ImBRbvG02824po/1aNhsztz5Mcf3BczzqzEwIriH5m/fHUTrvjdajRszhT9Wl0m8tel1590PCBONROiXeHLUSi0Rk17qDSV8h4GMNg6CwCUl3i4cfJemDi6X1GvM3xACc48dABeX9uC1RttS0BpSlDz2eH4jxOHoldJMB1sSN8UThvfH8tXN2PN+86UgL2GHfPmm2ufmPuidRCirnLiWxNRT5T1KvkegAOtcwBAWcrDD88biQl7VwRyvd5lHm48bySmHDMokOvtzKA+Sdx6wT44fVz/wK/dr1cCN1fvhU8e2Cfwa3dGgZsmfP9Ru78Qom7iCACF0scueaRKfdwDQfeXlxdYWcrDjeePxMcD+vDfQURw+L690b8iiadWbAv02gdWluHWC/bGXoPsDsRLeILjDuqLletbsXJ9q1mOdspz4vdf98TcB6yDEHUFRwAolLIq10PQ2zqH5wnmTNoz8A//9r54+EDMOKOyICvuu+KQ4b3w06n7YFCfVDAX3IWSpGD2F0fgyFHmt8IOXxt76YKx1iGIuoIFgEJn3CULjgRwvnUOAPjWSUNw1P72Hz5nH/ZBCSi2sXv2wi1T9kLvMnceHQlP8IMvjMCIAeaDQQCQgI/rrUMQdYU7v8VEXaWYAwd2sJwyth8mH+3OlO/Zhw3E1GOLl2fvQaW48fy9UFHq3sxhn7IEbjh/pCvZThsz45FTrEMQ7Y4Tvy1EXTXmkoUnA7jSOseooaX44bl7IZkw7yEfMmGfCry5rvBz4gMrkvjpBXs7Mezfmf7lSVT1L8GjL2+xjgJRb9y6U/a9DYsXc1sgOYsjABQqonq1dYZUQnDV2XsW9JCfQvFEcNXZwzFqaOEW55UmBdefuyeq3Bhi36WJY/q6sTNAdPyYpmM+Zx2DaFdYACg0xl6y8HMAjrDO8fXjhxT0A7bQylIefvCFwhWUaacMxegR3XuPgaXvn16J8oDOJNgV8eVKQN1riUTb2f+WEHWV6qXWEcbu2QvVR+9hHWO39hlcimknD8375xxzQB98/jD3/7ztDe2XwkUnDrGOAYiOHzt94WesYxB1hgWAQmHsjEeOA3CkZYZkQjDzM8PhFeGc+2L4/GF75LU9bnDfJK783PDAthcW0hcPH4h9BjswSuPJFdYRiDrDAkAhIZdYJzjnE3tgb8ODb7pLBJh+RiVKkz37BP/eaZXo2yuc64Q9T/DV4xwYBVCdMGb6guOtYxDtDAsAOW/MJQsOBnC6ZYYBFUl89Th3tvx11fABJag+pvuvSjhyVG8cn+drjK2deEgfJ9ZqiOA71hmIdoYFgJwniothvO//mycNdWWPebdNOWYQKvt3fQV/aUoCOVSo2DwRfOVTTrwn6jNjZizazzoEUUcsAOS0Ay95vA+A8ywzjBpaijMPLe4b/oqpNCX48ie7/kH4xcP3CMWWv644/uC+GDHQ/M/iCfz/tA5B1BELADkthabJAEw3dn/t+CHwwrgSrp0zxvfD8C58qPdKeZgcgl0OXeWJ4HMTBljHAICvHvXdJ3pZhyBqjwWAnCYq37C8/gHDynDcgeGeCwc+2MHw5S4Mh5939B4YUJEMIFFwPn3ogB4vhCygflsTjWdZhyBqjwWAnDX2+/MnAPi4ZYavHjcklNvgdua0sf2wR+/OP9zLUh6+dER0vv3v0K88gRMOsZ/CEcFXrDMQtccCQO7yvMmWl99/aBk+5cKxsgWSTAg+8/HOh8NPGds3tNv+duczH+9vHQEAThnzvfl7Wocg2oEFgNyUTnuATrKM8KUjB0bm2/8On/34gE4PMjp7wsCA0wRn/MhyDOpjPrXheUnvXOsQRDuwAJCTxjYe/UlARlhdv395EhPHOPGtsaCG9kvhqJ2cDjhmRDkOqoruGjVPBJ9yYC2HKr5gnYFoBxYAcpJCvmR5/bMPc2LhWFGccPBHpzVOHmM/R15sJx7ixHTOJzgNQK5gASAHqQhg9hKVZEIiPRz+yQP7Ipn4d7kRQehP/euKQ/eqQP9y82kAgZc42zoEEcACQA4a/72FhwIYbnX9Y/bvjcF9zT8oiqZvrwQ+tte/X+87ZngvDInwn3eHhCf4xH4V1jEgop+3zkAEsACQg3xPPm15/dPGR2/uv6Mj9vv3OoCj93diaDwQh+3T87cjFtAxo6Y9FP0hF3IeCwC5R/RMq0v37ZXA0aOi/4E4fuS/RwAObTcaEHWH7WM/AgAgWV6aOM46BBELADll7GUPDABwuNX1J47uh5KILv5r76DKXihLeShJCg4eHp8CUNk/1aUjkYtNxTvZOgNR9Cf+KFQkmzpWxa6Ynjou+sP/wAcLHQ+sLIMqIrvboTMT9qnAu5varGNMtA5AxBEAcooP75NW1x5YkcSYEWVWlw/cvkNKse+QUusYgTvYjfMODj744ofD/85lCjUWAHKKCD5lde1PHdQn9G/9644RA0tceFVu4BwpAEgkvSOtM1C8sQCQM8ZNn18Bw5f/HHNA9Bf/tbfnwFKM3CN+IwD7DSl1YtpD4B1hnYHijQWAnJETORRAyuLaZSkPh7uxRSwwlf1LUNk/fiMAyYRgv6EOTPWIsgCQKRYAcoYn8jGrax+2TwVKU/bfCoNUUSqoKI3Xn3mHAysdKADA4cenH+VCbDLDAkDOEOihVteO0174HcpLE6gojebrf3fHkamPig1b20ZZh6D4YgEgZyjEbP7/Y3s5cUBMoMpLPPQqiecjYOQebkx9aMI7xDoDxReHn8gJkybdk3hFYfIw7JXyijYkfPJ5l+T17y+46/oCJfmoVKL4w/+u/vn3GuTECADkg3v+99Y5KJ7iWf/JOa/sN3AvACZP5XEjy5Hw4jkXHleV/VKunPh4kHUAii8WAHKC+tjP6tpj94zf/H/ceZ5gaD+TDScfIsBo6wwUXywA5ARP1Wwx1H4xPA2PgCF97AuAAvtYZ6D4YgEgR4jZCMD+w5zYEkYBG9zXvgAA6MdXA5MVFgByggIjLa5bXuKhsr8THwQUsCF93VgDXVpSMsI6A8UTCwA5QodZXHW/oaWxOv+f/m2QA1MAACCezwJAJlgAyBVDLC46YgDn/+Oqf7krhyAJCwCZYAEgV5iMAAxxYCU42ejtyCmInmAP6wwUTywAZG7UtIdKAZgshHJlHpiC17vMjQLgA/2sM1A8sQCQuT690ReAyUT8UDdWgpOBPr3cePyJSn/rDBRPbvwGUKy1tJWancQz2JGFYBQ8V6YAwBEAMsICQOaSyPayunZ5GX8F4iqIdyF0hbIAkBE+/ciceEmzEYAyN86DJwNJRwYARHwuRCETLABkLoec2QhAXF+HS0DSc+TvXsWRKkJx48hvAMWaeGYvZy9N8lcgrlLufOy6k4RihUNPZE4M78NkkeeBi/U++7Bw+c/vufMKaBYAMsGvP2ROcsIiSvElwucwmeCNR+YkkeNePIovRdY6AsUTCwCZ88ERAIozZQEgEywAZE+FIwAUX4KMdQSKJxYAMifCxagUY5wCICMsAGTOchcAkTUFCwDZYAEgc77PAkDx5bEAkBEWALLn+VwDQLGlEK4BIBMsAGROuAuA4o0jAGSCBYDMCacAKMa4BoCssACQPQ+cAqAYU04BkAkWADLHg4AozoQjAGSEBYDMcQqAYo4FgEywAJA9HgREscYpALLBAkDmlAcBUYwpPI4AkAkWADIn8FkAKLa4BoCssACQA/gyIIoxvguAjLAAkAs4AkCxpR4LANlgASBzXANAceZBWQDIBAsAmePrgCnWfHAXAJlgASB7yjUAFF+cAiArLADkAC2xTkBkRTkFQEZYAMgFe1oHIDLje5wCIBOceyUX7GcdwFXJV34K2fSidYwe0YHjkD1wmnUM53mcAiAjHAEgUxPSfyoHUGmdw1XZvb8EeCFcIuGlkN3rXOsUoeCrJqwzUDyxAJCpzLaSfQGIdQ5nlQ2GP/x06xTdlqs6DSgbbB0jFASoss5A8cQCQKYUHof/dyN0H6YhLS1WBBhunYHiiQWATKmno6wzOC9kw+mhnbawM8I6AMUTCwDZUuEIQBfowHHQAeOtY+xWWHI6hgWATLAAkCnhDoAuc/6bdchGKlzhswCQERYAssYC0FWOz62Hbq2CIwTYY+/0o2XWOSh+WADIzPHpR5MARlpdv395+I7BcPZD1vFy0hlH7gHp3ehzISAFjgWAzKxv9PcCYDamve+QUqtL95yjw+zOT090Yp/BbtwDghynAShwLABkKGc6/L/P4HCOurq20M61PN3hSgGAeCwAFDgWADLjwXYHwL5DwvsOIme+cTs6ItFV7twDPgsABY4FgAzZFgBnvv31hCNz7s6uSegiZ0aBVLgGgALHAkBmFLaHAIW6AMCBD19HSkg+3FkHIhwBoMCxAJAlsxGA/uVJV1aA95zx8Lsz0xB5cOc+UBYACpwLd76pEVNnD8/l8AnxcKiv8sHXAcGqhI9XWgUvra+raTCOGFEqwMJ9rK7uzje//OxYgBf0K4PDvPCvo30Gl+L5t43fyCs8DIiCF88CcOHPUlWN6ydB8O2cjyMggGq7V9Ip4MsH+9Mqq2tfFuiDvngPrNmv7W9Ip33D5JExesbioQAqrK7vzNxvAWT3/hJS778E+JlgLhjyhX8dfVAAGm1DKIaOTt9Tsjx9TpttEIqT2E0BDJ38g7GVzeufVME8BY7owr9ysEKmi+riyhWpt6uqa9NDp6SHFD1oxHmaM/v2D7i0+rsAAp6LN197UGCO3AsemgcMsw5B8RKrAlA1pfZcTxLPQDGhhz9ihAJXeZp6p6q69taqqdeanWIXfmpaAMK+ALCjwD6UI7DwryNXRoMSiirrDBQvsSkAldWzJ6uiDkAh6n6pAt9UP/d65eTa/9nz3Ov4i9tdgn0tLx+1AhDUsHwUFv515Mp6EB8sABSsWBSAYRf8YDQgPweQKPCPLoHgP7LJ7OtV1bXpvb+cduOrRDiYjQC4s/K7sIq9MC9KC//ac+V+EBYAClj0C8CkexJeLnkXgF5FvEq5Ale1ZlMvVZ0/+7NFvE5kiGEBcOUbXzEU7Rt6xBb+deTCiJCqVFpnoHiJfAGoKl0xVaFjA7rcPurJfVVTZv9pxNTZPNlrFxRiVgBcmfMtiiLN0Udt4V9HLhQAUb4RkIIV7QIw6Z6EQq8I+rKq8umcypJh1bVTg752GHzwGmC7g08cWfVdNAX/sI7gwr+OnLgnhFMAFKxIF4DhJa8fD6uhZsVAAW6vrK79fdV56UEmGRy1oSU3EoZnULjwba+oCjxcH8WFfx05MirEAkCBinQByIlOts4A4Gw/kXqxqrr2ZOsgzshyB0CxFWrBXlQX/nXkxroQjwWAAhXpAuBBTrPOAHywuleB+VVTam/AhT+L9lepLrE7A8CVFd9ByPube8QX/rXnxn2hA4767hPFXKxM9CGRLQAjqq8ZpYBLq2pFFd+vbFr/92FfvmZv6zCWxLAAuPFNLyB5zt1HfeFfRy6MDG1NNnMUgAIT2QKQU/9I6wydOFyy/j9jPSUgYjYF4Mhcb2B6/CEeg4V/HblQADwoCwAFJrIFQAQHWGfYhcEKPFxVXXupdRALvukIgAOrvYPUw2H8OCz868iFe4OnAVKQIlsAVOzeNd9FngLXDquuvWvEpJtiNe8npmcA2H/LC1p3F/LFZeFfRy6MDglHAChAkS0AUITiRT0CnJsrbV445LzaodZZgjA6/WhvAGYTy3EsAEA3vtHHaOFfRy6sD1F1at0SRVx0CwDQ3zpANxydSODZyvOv6elbCkPDa85yB4CFLs7px23hX3su3B/Cw4AoQCwA7hgOz3+scvLss62DFFXO7gwAF77hWdrth3sMF/51ZD1CxBcCUZCiXADCOK9eAZHfVk6pvRxQsQ5TDJYvAXJhjtfUbob347jwryPrAqAsABSgKBcA3zpAD3lQzKmqrv1VJA8N8rgDwFJnC/ziuvCvI/N7RMEXAlFgIlwARK0T5EMhF1Q2bnho0Fev62OdpZB89bgDwNhHvunHeOFfR+ajRILeo6Y91Nc2BMVFhAuAZqwT5E10YrI1O3/EpPRA6yiFIvANDwFiAQDwkbn+OC/868iFdSK9ShKcBqBARLgA4H3rAIUggqNypanHq6ZeG4ptjbulspfFZV1Y4e2Sf33oc+Hfh7hwn3AnAAUlygVgs3WAAjrY93NPjphaO846SD7GzFw4FILeFtd24ZudU7YP+2f3Ojf2C/86sh4p8iEsABSICBcAjVIBgABVOcWjw6fOOco6S095WbsFgOZzuw7SgeOgA0PdKYvCugCI8LXAFIwIFwA0WAcoOMVA39eFw6bMOcM6Sk+ob3kGAHcAUNeY3yuiPA2QAhHZAqCQVdYZiqRcVO+vnFxbbR2ku2zPAOAUAHWNA6NFHAGgQES2AHiKqBYAAEhA8Othk+dcYB2kWwzPAGABoK6yXi+iPgsABSOyBSDn+SutMxRZQkR/UVU95yvWQbpKjc4AcGFlN4WH9f3CXQAUlMgWAM16y60zBCCh0F9UTa6dZh2ki0zWAFh/o6PwMR4xqorqUeDklsgWgHV31awFZJ11jgCICn5cOXn2xdZBduX49KNJQEdYXNuBOV0KGeMCUDb6u/MHWAageIhsAQAAAZZZZwiIQORHlVPmzLIO0pkNLbmRAEzGVc1XdVPoWN8ziQTPAqDii3QBUOhS6wyBUr16WHXttdYxdkZ8nwsAKTSsR418YQGg4ot0ARCReBUAAAJc6uRIgHILIIWH9boR4VZACkCkC4Cf82NXAAAAqldXTqm93DpGez64A4DCw/q+ERW+FpiKLtIFQBOlywH41jlMKOY4tTBQbN4CaP1NjsLLcuRIRXgaIBVdpAvA2rkzGgG8ZJ3DjMhNw6bU/qd1DAAQFZMRAOu5XAov+62ARMUV6QIAAAL81TqDIRHFT4ZVz/mmdRAYHQNsvZqbwsv23lEWACq6yBcAqMa5AACACPT/VU6e8w2rAOOmz68AMMTi2lwASD1lPHrEAkBFF/kCkEmVPGadwQEC0f8xfIEQdwBQ6BivH6lEOh355zPZisVxk5XVta8COMA6hwOyUD2nYd6sPwR50Z9+6vKrT3lziXtbE4kcdv+Bh4+evigd3zVMVHRxaZhxnwbYIQmRuyurrzktyIuWIntgkNcjiohDrANQtMWiACjwN+sMDikB/N9VTZ19bFAX7NXWundQ1yKKihJkOGpJRRWLAiC+ch3Ah5XDlweqpl7zsSAuVpFp4Z5mom5KZTNma2coHmJRABrunPU2gNesc7hEgX7q68NV1VcXfXi+T0sL32xG1E2l2QxPA6SiikUBAAAR/Mk6g3t0iIq3oGrqtSOLeZUBLc29ivnziaKoNJcdZp2Boi02BcBX/wHrDE5S7Kl+bsGQ82qHFuPH33TqTQN7tzbH5j4jKpSyTNse1hko2mLzYF6zOvc4gE3WORx1QCKJ+4dO+WFFoX9wtm3jkQIt9I8liryKTFtf6wwUbbEpAFicziow3zqGsxSf8LT1HhyfLugr0Mok9/FC/jyiuOjd1lpunYGiLT4FAICnXAewa3JG5YjUrwAt2AFRZZnsQYX6WURx0rulOWWdgaItVgUgqd6fAWStcziuuqp6zlWF+mFl2RaT1wAThV15tk1uOCs9yDoHRVesCsA7d16+CcAT1jlcp8BVhXqNcEVbli81IeqhbCtPA6TiiVUB+ID+0TpBGIji5qGT53w635/Tu7V5YCHyEMVRWS57sHUGiq7YFYBkNnU3AN86RwgkPdF7qqpnH53PD+nf0sSFTEQ95PnZ/awzUHTFrgCsuvvSegCPW+cIiV4K+WNPTwtMT0r37tfamCh0KKK46JXLFfWQLoq32BUAAFDI3dYZQmSQwvvz4C9f3+1TyXpt8Q/3eAQAUY+lMhmuoaGiiWUB8HJt9wqQsc4RIvskc5kHBk9K9+7Ov1SWyU0oViCiOCjPZgZbZ6DoimUBqL8rvV6hi6xzhIpiQqq05I+jJ6VLuvqvlOYyXMFMlIdemTa+SIuKJpYFAAAUcpd1hrBR6IkbS0t+2dWDgsra2riAiSgP5ZnWbo26EXVHbAtAm2buA9BinSN8dHJV9Zz/7so/2TvTwteZEuWhorWlzDoDRVdsC8DGeektAB60zhFGClxROWXOlN39c73bWvk2M6I89GttSaQL/H4Ooh1iWwAAQHyda50htFR/Xlk955O7+kf6tTRz+JIoDwnNoXcJRlnnoGiKdQGoAJm+BgAAIABJREFUr88+qEC9dY6QKgX0DyPOv3r/nf0f7xmdLunf3MRvLkT58rNcTEtFEesCgMXpLACOAvTcHrmEd//I86/5yErltyrx8YTmLDIRRUqJ7++0ZBPlK94FAICf8H8OgMfV9JTioIzn/6Hj9sASv+1wq0hEUVKS9flGTSqK2BeAdbdf8QaAv1rnCLnjNpYmb23/X5RlM6OtwhBFSUkuO8I6A0VT7AsAAEDkF9YRwk++Vjml9rs7/lNZNsthS6ICKM22DrXOQNHEAgAg0VL2WwCbrHOEnuKGqvNnfxYAyjOt/NZCVABl2ewg6wwUTSwAAFbf+71mAXgyYP489aRuePW14/u0tfKhRVQA5ZnWvtYZKJpYAP6N0wCF0dvX3H19W5v7WAchioKKtpZy6wwUTSwA29XX1TwnwD+sc0SBiO7dv7kxZZ2DKAr6tjZ3+QVcRN3BAtCOQn9inSEK9sgqSnJZ6xhEkVCeaZObTr1poHUOip4uvdUtNi78Waqyaf1bAPgSmzykSnqj3x72h5dVlCaw8LKDrGPQLiw65KvWEfIy60vfD+Q6mze9+q2W99fPfe/e9LZALkixwBGA9m67KKPAz61jhJ3nuTFiOaQvTyKmiMhlb02WptZWVdc+UDVlztdGTEpzRIDyxgLQgUrmfwC0WucIMy9Rah0BADC4DwsARYPnpQCgXIEzVfX/cqWpdZXVtY9XTqm9cODkNHcJUI+wAHSwdm56HYB7rXOEmZdwY/3fkL5u5CDKl+d9pMwmABwDxc9KJbW2ckrtvGFT5hwHKKd1qctYAHbG9262jhBmXsKNKYDBLAAUEfLRAtBeGRTni+riyuo5r1ZV1146dEp6SFDZKLxYAHai4c7Ln+WWwJ7jFABRYXVjVG1/Ba71NLWqcvLsO4Zd8AO+k4M6xQLQCW4J7LmEI4sAB/bmCABFgyfdvpdLIDJFcomllZPnLKiaMvusYuSicGMB6ERD+eB7ALxtnSNsBAJxZA3AwAqOAFA0SKLH97JAdKKq3F9VXftkVXXtyYXMReHGAtCZ2y7KAPiRdYywkUSJM4dLDOydsI5AVBAi+ZdZBY5U4JHK6tq/D51y9YkFiEUhxwKwC1Ke+TmA9dY5wiThyAJAgCMAFB0F3llztKfeosrq2keGV187vpA/mMKFBWAX6m9LN4nordY5wsSVHQC9Sjz0KuHtTdGw/RyAQjvZR+65ysmz7xhyXu3QYlyA3MYn5G6IeLcAaLTOERaunALIb/8UJSIeRIryuPYgMiWRwCtV1bWXjpp2ixtbeCgQLAC78e4dMzco5FfWOcLClSmA/iwAFDFSnFGAHforcG3jpq3PDJ08+8hiXojcwQLQFUm5EQBfb9cFrkwB9C/nAkCKlp2cBlgMYzyRv1dW1/5s0Fev6xPEBckOC0AXrPn15SshuMc6Rxi4UgD69mIBoGgp0jqAnV4KwIWptuzSyim1pwZ1UQoeC0AXJQTXAVDrHK5zpQD0YwGgiPF6fhZAT+0FxZ8rq2t/VnVhujzoi1PxsQB00eo7apYAuM86h9skyG8pu8QRAIqaQpwF0JPLArhQm1JPDz+/9lCLAFQ8LADd4AuuBOBb53BVwpF3AABcA0DRY/yWzUN8D09WTa6dZhmCCosFoBvWzq1ZBuUoQGdcGf4HgD69uAuAoqXIuwC6okwFtwyrrr1r6JQfVliHofyxAHST7+EqcBRgp4y/oXwI1wBQ1AS0C2C3BDjXQ9szlVOuPtg6C+WHBaCbOArQOVfOAABYACh6jNYA7JziIKj3xLDq2jOto1DPsQD0gCZzXAuwE55DawD69OKtTdHi0hTbdv0F+FNVdW3aOgj1DJ+SPbDm9iuXA/iDdQ7XuHIMMAD0LuMIAEWLK1MAHYgCV1VW1/4Mx6edDEidYwHoIU3kuBagA5fWAJTzRUAUMUV8H0AhXFg5PPVbnhcQLs7eTa77YBRAfmOdwyWuDFH2KvGQ8MQ6BlHBiZujAB8QfBZNqUUjz79mgHUU6hoWgDz4kqsB0GadwwUi4sI2JQBARSmH/ymaxHP73lbgyIzn/2XYV+YMts5Cu8cCkIe1c694SyG3WedwgUgKrnznLi9xJQlRYbly0uZuHCpZ/euIqbOHWwehXWMByFcKPwCwxTqGNZfm/7kAkKLK0YWAH6U4KOvL4qqp1460jkKdYwHI05pfzXxPgB9Z57Dm0jeTilLe1hRNTp0FsBsCjPL93KJB1bWV1llo5/ikLIBMa+YGQNdY57DkygJAAKgo4QgARZPrawA6EmBUCnhk+NQ5e1hnoY9iASiA9+5NbxOg1jqHJZemACo4BUARFaYRgHbG+L4u3PvL6f7WQejDWAAKpL588M8UWGGdwwqnAIiKL5EIZQEAgENbs6n7Rk27xZ3jQokFoGBuuygDoMY6hhWXTgEsZwGgiArpCMAOxzVt2noHoNym4wg+KQtoTV3NPQAes85hwaU1AGUp3tYUTU4fBNQFCpxTVT3nv61z0Af4pCwwz8fFAHLWOYLm0hqAsiS/YFA0hb0AAIACVwybPOcC6xzEAlBw795Z8wKAX1jnCJIAzpwCCAAlSd7WFE1euKcA/kVEb6uaOvtY6xxxxydlEWhKZgHYbJ0jKOK5cwogAJSlXEpDVDheeBcBdlSivvx2z3Ovq7IOEmcsAEWw5lcz3wP0auscQXFp/h8ASlkAKLLE5TcCdtfQTCL729GT0m49QGIkMneSaxrKB/8EwKvWOYLg0vw/AJRyCoAiLArrAHYQwVEbS1PXWueIKz4pi+W2izICTLOOEQSXzgAAOAVA0Ra20wC74LuV1bO/YB0ijlgAiqi+rmYBgPuscxSbS2cAAEBJMnIPSKJ/SYhbhbsw5P+qzp29p3WKuGEBKLIM8C1EfEGgc1MAHAGgCJPoLARsr78mvF/ykKBgsQAU2fq6mgaBXmGdo5hcGwHgQUAUZSE/DbBzohMrJ9d+xzpGnPBJGYD6UdlbATxhnaNYXBsBKOFBQBRhUVoE+BEi1wy74AejrWPEBQtAENJpXxO5CwG0WEcpBi4CJAqOF71FgO2VebnEL5BO87MpAPx/ckDW3H7lcghmWucoBs+xbyQ8CZCiLCqnAXZGgSOGvZ78D+scccAnZYAa5s68GcCfrXMUkogHOHYwScLjCABFV6SnALYTkWuGT75uhHWOqHPryR15osls8usANlgnKRTXvv0DAAcAKMoidBLgrvT1JXuLdYioi8Wd5JJVd19aD+hF1jkKxaWXAO3gCUcAKMIk0msA2jt72JQ5Z1iHiDIWAAMNdbN+B+BH1jkKwbUFgJ4n4Oc/RZl4MXpsq/541LRbSq1jRFWM7iS3NKzOXALgr9Y58uXasaQJfvhTxEV9EWB7Aoxq3LTlP61zRBULgJXF6Wwuh3MUqLeOkg/XDgHiAkCKuliNAAAA5KrBX75+mHWKKIrbneSUdXfVrBXIuQDarLP0lGt7klkAKPJiNAKwXd9kNvPf1iGiiAXAWEPdzL8J9MsA1DpLT7i2CJCf/xR1gtjsBGjv65VTZh9mHSJqYncXuai+btZdUK21ztETrm0D5AgAxYFra28C4EHlZr4sqLBYABzRMK/mSqjOtc7RXa4dSpLkKkCKAYnPVsD2jhlWPWeSdYgoYQFwhmjFwL7fAPCYdZLucG4boIRyJoWoW2JaACDAtdwWWDgsAA5Z8ZNvt7Zq5jMAnrbO0lXuTQHwlqboi+EagB32adq05RvWIaIitneRqzbOS28pTWZOAfR56yy7I3BvCoBLACgO4joCAAAKuXLg5HRf6xxRwALgoJW/Tm/2JXsaBK9YZ9kV1z78ASDBO5piIIaLANsbXCap71mHiAI+Lh21dm56nUjiVAVWWGfpjGtbAAFAeA4wxUCcRwAAQIHv83Cg/LEAOKz+jsve8XM4ViBLrbPsjGvz/wDgKxcBUvS5dgCXgd6JbLbGOkTYsQA4bt1dNWu91rbjIfindZaOXJwC8H3rBEQBiO8iwH/xoBeNqL5mlHWOMONdFAKr701vTOW80wR4yjpLe+LgkaQ+BwAoBlz83QuaAqkc9AfWOcKMBSAk3rnz8k0lycwJAtxjnWUHL+HeMKRyCoBiwON21+303OHV1463ThFWvItCZOWv0y31dTPPFcCJF2O4uBApxwJAceDg754R8ZGbZR0irFgAQke0vq4mDeBiADnTJA4+hJRHhVMMCB/d7X2BowA9w7sopBrqan6swGcBbLbK4DlYAHJcBEAxIDzxqj3xkbvCOkQYsQCE2Jq6mgdzCf8wBZaYBHCwAHAbIMUDH90dfJ6jAN3Huyjk1t1+xRtlycwRovh10Nd28hwAbgOkWOAIQAccBegBFoAIWPnrdEv9vJqvqOC/ADQHdmEH9yJzBoDigLsAdoqjAN3EuyhC1syt+X8QfwKAF4K4njj4EPLZACgWOAKwE+Jr7krrEGHi3hOc8tIw94qXKwb0OVKB6wAUdUDcxVeS+mABoBhwcP2NEwRnj5haO846Rli49wSnvK34ybdb19TVXCbAaQDeKtZ1XCwAXANIccCXXnVKcopLrUOEhXtPcCqY+rqaBYnWXqO3jwYU4cwA9x5COS4CpBgQB3/3nKH40pALrt7POkYYsABE3Op7v9e8pq7mMs/HYQCeK+TPdvEwEm4DpHhgAdiFhJdLXGwdIgzce4JTUbx7Z80LDaszR0BwEYD3CvJDHZ0C4GFAFHnCe3xXBPrVYV+ZM9g6h+vce4JT8SxOZxvm1tyWaM0cBJVbAGR7+qME7s5Dtmb5cKRo45HXu1XuZf3/sg7hOhaAGFp9b3pjw7yZ3/E193EAf+7RD3Hw2/8OLRkuBKBoc7R7O0Uh/zV4Urq3dQ6XufsUp6JbO+/KpQ11NWf4qkcpsMg6T6G0sgBQ1HGQa/cUA5Olqa9Zx3AZCwBh7bxZT62pq5noKSaq4knrPPniFABFHocAumr66EnpEusQrmIBoH95d17NojXzao4WTz8pkHuxi62DLn/EtrRxBICIAAAjNpYmJ1mHcBULAH1E/R2zHq+vm3lOLuEfuH2xYJN1pu5oy7lcT4gKQFlyu0zku9YRXMUCQJ1ad/sVbzTMm/md0mRmOAQXfei1ww7vt2/mCABFnDr8++ccxYRh58/+hHUMF7n3PldyzspfpzcDuA3AbZXVcz4J6IWAfgFAL+NoO9Wa4cORok05AtAt4sk0AFOsc7iGIwDULQ11M//WUFczJdHaaw9A26zz7EwbFwFSxGkxTvaOMAG+NGLq7OHWOVzDAkA9svre7zUDss06x840cxsgRR2nALpFgVTWl69b53ANCwDlo8U6wM60ZfntiKJNlfd4d3nARdwS+GEsAJSPZusAO9PCNQAUceqzAHSXApXcEvhhLADUYwJstc6wMzwKmKLOZwHoEYFMs87gEhYA6jEFNlhn2BkuAqSoU+3xe7xiTYEjqqprP26dwxUsANRz4mYB4BQARR3XAOSF7wfYjgWAekzVzQLQmuUUAEWb+hwByMPkqgvT5dYhXMACQD0mjk4BNLbw2xFFm5/LWEcILQX6aWPq89Y5XMACQD0mjo4AbG3hCABFW85nAciLCKcBwAJAefCh660z7MxWjgBQ1GnmcesI4abHjTj/6v2tU1jjuwCox0QTGyDufdve0sQCEBYnvfRL6whd8sVbXse7m5w5+VrbSsu/4GVaFgEYYx0mpCSXkK8CuNw6iCWOAFCPeQlXpwBYAKiwtjS7c08psGHt/35znS/+ZwBZZ50ntBRfxoU/S1nHsMQCQD2Wc3UNQKsPn2elU4H4qmh06BXTovIuAKyde8VbAL4IoNU2UVjJsKpt751hncISCwD1WKnnO7kGwPcVzQ49sCncGlt9+L5DhdLz63f8rw11M/8mqhcAcChgeKgnsX5FMAsA9diz103cAsDJ5cguDdlSuDl3L6k0tP+P9fNm/UaA2VZxQu7MgZPTfa1DWGEBoDyIClC/+38ueFubOQJAhbHVtQIAWd3xv6mvm3mVCsKxotItZSWS+px1CCssAJQXFXnbOsPObOFCQCoQ186VUPEbPvrfiq5p2f9CKP4YfKJwE+h51hmssABQXsRXJwsAdwJQoWxtcevYXa+zUbd7z8lJReZ8AZ4KOFLIycShU9JDrFNYYAGgvPge3rHOsDM8C4AKZYtr00m+vtnZ/6n+tnQTcpmzALwWYKKwS4qWfME6hAUWAMqL+HB0BMCxhzaFlmOjSX5Frs8bu/oH6u9Kr88l/DMArA0oU+gJ9FzrDBZYACgvXsLNEQDXhm0pvNxaBCjvPPmjo5t390+tu/2KNyD6aQDbAggVBZ+sPH/2XtYhgsYCQHnxs76jIwAuPbQpzNxaUOq/3tV/smHurGd8lfMAsA3vnsBD7KYBWAAoL739Pm/DwUNInJu3pdByaz2J1625/bXzZj4gIv9RrDTRIp+1ThA0FgDKy/bhSOdOBNzSzC89VBgujSZJN0YAdqifO/MXAvx3MfJEzDHDp87ZwzpEkFgAqBCcmwbgIkAqlG2t7txL6id6tLq/vq4mLcCthc4TMQnN6anWIYLEAkB5E3VvIeD7TRwBoMLY3OjOveSnMt0eAdihvnX/bwO4r4BxIscXnGWdIUgsAJQ39XSldYaONmzLgi8EpHypAhvdKQBtg8tKV/b43773nJwvJdUQ/LNgiSJGgFNxfDppnSMoLACUP797C5OC0JZVNDo0dEvhtK01h7asM03yzcXpE/JqI2vnzmiUbOZMAC8VKFPUDBg2InGsdYigsABQ/sR/xTrCzmzY5uSLCilENmxz5ts/FNLj4f/26u9Kr09mkycDeKsQPy9qPPE+bZ0hKCwAlDdRfdk6w844NHRLIeVSAfAKeLzvqrsvrc8l/JMF2MmLheLNV8RmOyALAOVtyQ2nrgOw0TpHRxu2ubN9i8Jpk0P3kC/+i4X8eetuv+KNnOAUiHu/u5YEGBWXUwFZAKhQXrUO0NFGh769UTg5NY3kewUtAACwdm7NMs3p6eCRwR+W8D5lHSEILABUGArn1gFwCoDy5dA91Ka9Nxbld2zNnbP+6Yv/WQAtxfj54eR/0jpBEFgAqDBE3CsALn17o1ByZhpJ5eXl6XPaivXj18694i9QPR98b8AHVI6zjhAEFgAqCHFwJ8B6TgFQnlyZAlDRgg//d9Qwb9YfVFgCtjtgz3Ovq7IOUWwsAFQQkvWcKwDr3udzjPKz9n03CoCoFL0AAMCaubPuVZWvA4j9IRqZZDby5wGwAFBBDOibeBNAq3WO9tZtcePhTeG1bosbJVK8wu4A2JU182beLopvIOYlwFNEfiEgCwAVxPYTyt6wztHe1pYcmjOxfoZRHprafDS2OrIGwNelQV6ufl7NLwW4CA6+6jswIiwARF2lgHMHAq1zZAiXwseV4X8IGraftRGo+rqa/4Pq94K+risUOnrolB9WWOcoJhYAKhxFoN9SusKVIVwKH3emkPQFqys3zJt1MwRxLQGe+NlDrEMUEwsAFYwAZg+qzqzbUrSdUxRxzpTHgBYAdqZhbs2PFLjSMoMVD/5Y6wzFxAJABZNVz8EC4MhDnELHlfIY1A6AXVlTV3O1AJdZ5wiaesICQNQVL9940tuAbLLO0d57W10ZxqWweW+rK+Ux9w/rBABQX1dznUJnWOcIkqqyABB1XfEPLOmOtTwLgHrIkTUA7y254VRnXtu7pm7WDRD9JmKyO0CAcdYZiokFgApL3FoH0LDZjWFcCp/6TfYFQAAnvv231zB31v9C5SLE45yAwUOnpIdYhygWFgAqLHVrBKB+cxs0Ft9VqJBUgTXv25dHdbAAAEDDvJk/F8jXAThyUEIxJcZYJygWFgAqKN+xnQCtGcWmJk4DUPds2JZFa8a+OaqIkwUAAOrrZv5KVCcj4u8OSPje3tYZioUFgAqrYvNLAOy/OrXz7kb7oVwKl3o3po5UvJZnrEPsSv28Wb9RlfMEiOwvmQ8ZYZ2hWFgAqKCWp89pE+Al6xztcR0AdVf9JifumVeXXvtpp3bV7MyaeTN/64t8DkCTdZZiENE9rTMUCwsAFZy6tg7AjYc5hci7Ltwzqs4O/3e0Zu7MhzxPJkKw0TpLoYnoMOsMxcICQIUn9geXtNfgwGIuCpeGzfbT2uLw/P/OvHvHzCcB/1gA71hnKSRVGWCdoVhYAKjgBOLUvOW7m+wf5hQubowaeaEqAADQMPeKl5PZ5FEKLLHOUkAsAERdlapofhYOrQx242FOYeLAupGW1Pv9nHu5VlesuvvS+mRr5gRVPGmdpUD6WQcoFhYAKrhn02c1QWW5dY4d1m7JoC1rv6WLwqEtq1hnfAywAM8+e9thoV1Zv/re9EavIjNRgAets+RPE9YJioUFgIpD3FnA5PvqxqIuCoXVG1vh+8aFUfWvtgHyV39buqm+fNDZAr3dOkt+hAWAqDsE+rR1hvbe2cACQF3jwr2imvibdYaCuO2iTH1dzVcgmInwHh0s1gGKhQWAikI9t1Ywv7Oh1ToChcTb9gUgl8h5UZk/ByDaMLfmGhU5C8AW6zQ9EMnzDQAWACqSpb3+vhzAVuscO6xiAaAuWmVdAARLXrj5hM22IQpvzdyZD/maOxaKldZZukMg71tnKBYWACqOdNoH8Jx1jB3eXm/+rY5C4p0NLabXV5XQz/93Zu28K5fmfBwJ4AnrLF2lUBYAou5zZyHg2xwBoC56x7gsetBozP93Yt1dNWsrBvQ5URS/ts7SNfK2dYJiYQGgohHxnFkI+H5TDluaY/DmUsrLluYc3re9T9RPyeOWAYKw4iffbq2fV/MVAS6D44sDRfw3rDMUCwsAFY2fzTkzAgBwISDt3kr7qaLXls2ZuNY6RFDq62quE+A0AO9ZZ+mMKl6zzlAsLABUNMtuOnUVgHrrHDu8vZ4FgHZtlfH8PwSRnf/vTH1dzYKEpx8D4OTIh+8nIrQj48NYAKioRPGUdYYd3nrP/NsdOe7Ndbb3iKibH4LFtvqOWe82rM6cINAbADhzbKcC9WvvvPxN6xzFwgJAReV76sxq3zfWGX+7I+dZ3yNeIhu7EYB/WZzO1tfNmiGef4q6MnIoeNg6QjGxAFBRJeDOiWZvsgDQbhgXgHdeuPb0lZYBXFB/xxULy5KZ0QrcbZ0FOdRZRygmFgAqquTmfs/DkZO01m3JcicAdWpLcw7rbV8CtNDy4i5Z+ev05jV1NecpcAGADRYZBHhjzQGZxyyuHRQWACqqZ287LCOAM7sB3nqPCwFp56yH/6FYZBvAPWvqau7wJXMIVOcGfW1f5ertB5pFFgsAFZ2KOrOwidMA1Bnje0Oz2dyjlgFctXZuel3DvFlTBfJZAIEsyBPI0jVtoyI9/A+wAFAAPJG/W2fYYcVajgDQztnuANCXXr75tAbDAM6rr5t5f0P5oIMAXIzivlSoxfO0GveeE/n5QhYAKrrGpsyTAJz4ZXqTUwDUiRVr7UYAFB7n/7vitosyDXU1P05mkwcL8D8ACt3aciL4yuo7apYU+Oc6iQWAim7FT87YAoETv1BvGD7kyW1vvmd3b3ia4/x/N6y6+9L6+rqab0lWRwlwK4BCNPs2UZ1cP7fGfvdBQFgAKBiOHHCytSWHte9nrGOQYxo2Z7CtxWy9VzaV8OK7/z8P9XfPWlVfV/OfpcnMMAguAvBST36OAksEOKp+3qzfFDii01gAKBAKd9YBvNLAUQD6sFcbmi0v/8yz150c2VfOBmHlr9ObG+bW3NYwKjNWRY7ffqLgy7v79wT4h0DPX1M+6LD6uhpnXl8elKR1AIqHlPh/y6pYxwAAvLamGccd1Mc6BjnEshSqcPtfwaTT/hrgMXzwPzMGVddWlioOyUEPhMhIEWQFsgWK1zzPf3r1HbPetY5siQWAAvH89afUj52+YAUEo6yzvFLPEQD6MNMRAJ8HABXL+rqaBgANAEvWznAKgIIj+It1BAB4pd50uJcc9JrdCEBTS2smsm+bI7exAFBgBLrYOgMAbGzMWh/5Sg5Z+34GGxuN7gfRx1b85AzuTSUTLAAUmEzGXwxHXvXJUQDa4VXL+X/fi/Tb5shtLAAUmO0nnb1qnQMAXrFd9U0OeW2NXQFI+NF+3Sy5jQWAAqWAE+edv2r40Ce3GJbBt168aeJrVhcnYgGgYCkWW0cAzPd9k0Os7gVV/NnkwkTbsQBQoDy4sQ7gvS1ZnghIaNicMVsQ6nk63+TCRNuxAFCgltxw6jpAe3RcZ6EtW91kHYGMLV9tNhLU1opyJ6bDKL5YACh4Kk48+JbaPfzJEUtXNxpdWR5/9fpjtxpdnAgACwAZUM+NhYDLWABiz/Ae4PA/mWMBoMBpJrcYgNmr13Z4taEZrRnz5QhkpDWjeN1oN4gqt/+RPRYACtzyH522EcCz1jmyOcWrazgKEFevNDQjkzMpgPXLbjhpqcWFidpjASATourEC1CWruJCwLhausqs/D0ACIeeyBwLAJnIed4C6wwAsMzuQ4CMLTNaACjqP2ByYaIOWADIRvnGvwOwWoL9L0s4AhBbRgsAm1O92/hqWnICCwCZWJ4+pw3A36xzbGzM4t1NbdYxKGDvbmrDhm3BHwAkwKJn02exdZITWADIjooT0wDPreTzOG6efctm8ElVOPxPzmABIDsJdaIAPL/SfCaCAvaczd+5ipd40OLCRDvDAkBmll43cRkEDdY5nn5rm3UECthzb5sUgOeXXH/CaosLE+0MCwAZEoWK+YKo9VuzWM11ALGxemMb3ttiMP8v+FPgFyXaBRYAMqXiP2KdAQCeM5oTpuA9Y/R3ncsJh//JKSwAZEo1tQAOvB74Wa4DiA2T+X9Bw/IbT3om+AsTdY4FgEwt/+EJawA8b52DOwHi43mb+X+e/kfOYQEgcwoxfzHK+q0ZrNrAdQBR9/b6VqzfGvz8P3LeH4K/KNGusQCQuYSnf7bOAHA3QByYTPWFL3GfAAAHf0lEQVQotm3t4znxCmyi9lgAyNwBb256EsBG6xxPv8l1AFFn8XcsggdXpk+wee8w0S6wAJC5e+89JwfYbwd8+s1GZG1eD0sByPlqVPL0jwYXJdotFgBygkLN1wE0tuawbDUXA0bVklVNaGzNBX3ZjJdJOTHFRdQRCwA5IZfJ/RkObAd8agXXAUTVk6+b/N0ueuHmEzZbXJhod1gAyAkv33xaA1SWWOd48g0WgKiyKHcqHP4nd7EAkDvEfjfA62tabLaJUVGt35rBinWBr8PzU8D9QV+UqKtYAMgZPtT8VamqwD/e2GodgwrsyRWN0OAnmP75/PWn1Ad+VaIuYgEgZyyveOJJAGutczzFaYDIMRr+/23gFyXqBhYAckc67UPtdwP8Y0UjfN98PSIViO8rngn+kCdNernfBX1Rou5gASCniIj5K1O3tuSw7N1m6xhUIEtXN2NLc7Db/xT69AvXnr4y0IsSdRMLADklV5GcD8D81LTHXuY6gKh49OUtBleVew0uStQtLADklOXpE7YBWGydw+ZDg4rhb68GX+YkIb8P/KJE3cQCQM5xYRqgYXMbVqxttY5BeXqtoQX1m4J9y6NC/7n02olvBnpRoh5gASDn+Nncn+DAqYCLX37fOgLl6bFXOfxP1BkWAHLOsptOXSXAi9Y5HnuF0wBht9hgLQeH/yksWADISSpqPg2wYm0r3g14+JgKZ/WmNrwZ/Ol/T3P4n8KCBYCc5Oc88wIAcBQgzB4zWMgpAg7/U2iwAJCTlt940jMA3rXOwe2A4WVR3nz1OPxPocECQI4SheAh6xTLVjdjwza+HChs1m/NYPnqwIf/n1n2w5PeCPqiRD3FAkDOEt83nwbwVbFoOacBwmbR8i3wA3/7D1f/U7iwAJCzKnJ9FgJoss7xyDJuBwwbi78zhfDsfwoVFgBy1pM/OroZwELrHMtXN2HVBu4GCIvVm9rwcn3A73IQeZbD/xQ2LADkNAX+aJ0BAB5Zttk6AnXRwy9uRuCj/8pX/1L4sACQ07JJ+SMA81V4Dy/hNEBYLAh++F8TiezdQV+UKF8sAOS0V66ZuAGQv1rnWL2xDa8EPaxM3fbSu814J/jpmsf56l8KIxYAcp4InFhcxcWA7jNZ/Cd6Z+AXJSoAFgByXk4TvwfgW+dYsGwLfN/8HUXUCV8Vf3kp8AKQKc2lOP9PocQCQM5b/sMT1kD1Kesc67dm8OxK812J1Iln3mrCe1uCXS6ikIefvfGE9YFelKhAWAAoJDwnpgEefGGTdQTqxAPPB/934yk4/E+hxQJAoZBIZn4PwHz8ffHLW7ClOWcdgzp4vzmHvwZ/9n8jkDM/rZKop1gAKBS2r7J+3jpHa1a5JdBBD7+4Ga3ZYPuhKH6/5IZTGwO9KFEBsQBQaIjCiTet/fE5TgO4xuTvRITD/xRqLAAUGuK78bKVN9e1YNlqLgZ0xZJVzXjrvdagL/vewIqE+THVRPlgAaDQePGmia8BWGadAwDu5yiAM4z+Lu5enD7B/IRKonywAFC4qNxjHQEAFi7fgsZWLga01tias9j7D/j+7cFflKiwWAAoVDwfv7HOAADNbT4eWRr4qnPq4JGl76O5LfAzol5aeuOpzwZ9UaJCYwGgUHnxpomvCfCCdQ4AuN9g3zl9mM3iP70j+IsSFZ5YB6B40IdO79uWlDPV804U9ccrZG8B+gNIWWcLs9KTHzT9HW5dcKb52Qwhl1Fgs0BXKuQFEfylpCzxoBx7/1brYBR9LABUVC0LzzhAVC4FcC6Acus8UcMCEElNqrgLkOvKTnngdeswFF0sAFQU+sSkXpmmpqtV8R0ASes8UcUCEGkZQG4uSW67Uk5Y3GIdhqKHawCo4Foe+fT+bY1N/1TF98EPf6KeSgE6oy3b+9HGh0+ttA5D0cMCQAXVtuD0j0H07wDGWGchigY9Mukl/9m68DPjrJNQtLAAUMG0PPLp/X148wUYbJ2FKFIEI6C5Pzct+vRw6ygUHSwAVBD66PFl4um9/PAnKpqqhOof9YlJvayDUDSwAFBBZHIVs6EYb52DKNIUE9qami6zjkHRwAJAeWtZeMYB21f7E1GxKb7PRYFUCCwAlLft+/y52p8oGBWJRPIK6xAUfiwAlBd96PS++OCQHyIKiABT9fHP9LHOQeHGAkB5aUvKmeAJf0RBq2hr8c+wDkHhxgJAeVHPO9E6A1EcqSp/9ygvLACUF1GfK/+JDAiEBwNRXlgAKC8K2cc6A1EcCbCvdQYKNxYAyosAfa0zEMWRQvtZZ6BwYwGgfJVYByCKqVLrABRuLABEREQxxAJAREQUQywAREREMcQCQEREFEMsAERERDHEAkBERBRDLABEREQxxAJAREQUQywAREREMcQCQEREFEMsAERERDHEAkBERBRDLABEREQxxAJAREQUQywARERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERETklP8Ps20kOsRO0KIAAAAASUVORK5CYII="/>
  
    
    <style>
    @import url(https://fonts.googleapis.com/css?family=Roboto);
.form-group select {
  width: 100%;
  font-size: 1rem;
  height: 1.6rem;
  padding: 0.125rem 0.125rem 0.0625rem;
  background: none;
  border: none;
  line-height: 1.6;
  box-shadow: none;
}
.form-group .control-label {
  position: absolute;
  top: 0.25rem;
  pointer-events: none;
  padding-left: 0.125rem;
  z-index: 1;
  color: #b3b3b3;
  font-size: 1rem;
  font-weight: normal;
  -webkit-transition: all 0.28s ease;
  transition: all 0.28s ease;
}
.form-group .bar {
  position: relative;
}
.form-group .bar::before {
  content: '';
  height: 0.125rem;
  width: 0;
  left: 50%;
  bottom: -0.0625rem;
  position: absolute;
  background: #337ab7;
  -webkit-transition: left 0.28s ease, width 0.28s ease;
  transition: left 0.28s ease, width 0.28s ease;
  z-index: 2;
}
.form-group input,
.form-group textarea {
  display: block;
  background: none;
  padding: 0.125rem 0.125rem 0.0625rem;
  font-size: 1rem;
  border-width: 0;
  border-color: transparent;
  line-height: 1.9;
  width: 100%;
  color: transparent;
  -webkit-transition: all 0.28s ease;
  transition: all 0.28s ease;
  box-shadow: none;
}
.form-group input[type="file"] {
  line-height: 1;
}
.form-group input[type="file"] ~ .bar {
  display: none;
}
.form-group select,
.form-group input:focus,
.form-group input:valid,
.form-group input.form-file,
.form-group input.has-value,
.form-group textarea:focus,
.form-group textarea:valid,
.form-group textarea.form-file,
.form-group textarea.has-value {
  color: #333;
}
.form-group select ~ .control-label,
.form-group input:focus ~ .control-label,
.form-group input:valid ~ .control-label,
.form-group input.form-file ~ .control-label,
.form-group input.has-value ~ .control-label,
.form-group textarea:focus ~ .control-label,
.form-group textarea:valid ~ .control-label,
.form-group textarea.form-file ~ .control-label,
.form-group textarea.has-value ~ .control-label {
  font-size: 0.8rem;
  color: gray;
  top: -1rem;
  left: 0;
}
.form-group select:focus,
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
}
.form-group select:focus ~ .control-label,
.form-group input:focus ~ .control-label,
.form-group textarea:focus ~ .control-label {
  color: #337ab7;
}
.form-group select:focus ~ .bar::before,
.form-group input:focus ~ .bar::before,
.form-group textarea:focus ~ .bar::before {
  width: 100%;
  left: 0;
}

#ideas-box{
    height: 100%;
    font-size: 14px;
}
#ideas-block{
    border: solid 1px #e0e4e9;
    border-radius: 8px;
    width: 32vw;
}
#ideas-block {
  select {
    width: 100%;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}


@media(max-width:1700px) {
  #ideas-block{
    width: 30vw;
  }
}
@media(max-width:1600px) {
  #ideas-block{
    width: 28vw;
  }
}
@media(max-width:1500px) {
  #ideas-block{
    width: 26vw;
  }
}
@media(max-width:1400px) {
  #ideas-block{
    width: 24vw;
  }
}
@media(max-width:1300px) {
  #ideas-block{
    width: 22vw;
  }
}
@media(max-width:1200px) {
  #ideas-block{
    width: 19vw;
  }
}
@media(max-width:1100px) {
  #ideas-block{
    width: 17vw;
  }
}
@media(max-width:1010px) {
  #ideas-block{
    width: 32vw;
  }
}

</style>

    <div id="ideas-block" class="form-group">
        <select id="ideas-box">
            <option>Please click the new idea button..</option>
        </select>
    </div>

    <div id="loader-text"></div>

    <style>
    .dmate-name{
        background-color: #fd5068;
        margin-right: 6px;
        border-radius: 5px;
        color: #fff;
        padding:4px 12px;
        height: 28px;
        display:inline-block;
        text-transform: uppercase;
    }

    #dmate-suggestion{
        display: inline-block;
        padding: .35em .65em;
        font-weight: 700;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: .25rem;
        background-color: #0d6efd;
        position: relative;
        bottom: 4px;
    }

    #loader-text{
        display: none;
        padding: 0.55em .65em;
        font-weight: 700;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 1rem;
        background-color: #3ca4ff;
        position: relative;
    }
    
    #loader-text:after {
        content: 'Thinking';
        animation: load 2s linear infinite;
    }
    @keyframes load {
        0% {
        content: 'Thinking';
        }
        33% {
        content: 'Thinking.';
        }
        67% {
        content: 'Thinking..';
        }
        100% {
        content: 'Thinking...';
        }
    }
    </style>
    
    <div class="CenterAlign Fxs(0) Fz($xs) dmate-button-right-wrapper">
        <button id="dmate-new-idea" class="dmate-buttons new-idea-active H(72px) Tt(u) Lts($ls-m) StyledButton Bg($primary-gradient):h::b C(#fff):h Fw($semibold) focus-button-style">{GENNERATE_BUTTON_TEXT}</button>

        <button id="dmate-send-button" class="dmate-buttons H(72px) Tt(u) Lts($ls-m) StyledButton Bg($dmate-send-gradient):h::b C(#fff):h Fw($semibold) BdEnd Bdc($c-divider) W(50%) focus-button-style" disabled>{SEND_BUTTON_TEXT}</button>

        <a class="support_button" href="mailto:{SUPPORT_ADDRESS}?subject={SUPPORT_SUBJECT}" target="_blank" rel="nofollow noopener">
        <i class="fas fa-info-circle"></i>
        </a>
    </div>

    <style>
        .support_button {
          color: #3ca4ff;
          text-transform: uppercase;
          text-decoration: none;
          background: #e0e4e8;
          padding: 8px 8px 5px 8px;
          border-radius: 20px;
          display: inline-block;
          border: none;
          transition: all 0.4s ease 0s;
          font-size: 20px;
          margin-left: 12px;
        }
        .dmate-button-right-wrapper{
            position: absolute;right: 28px;bottom: 9px;
        }
        #dmate-send-button{
            cursor: default;
            border-radius: 22px;
            background-color: #e0e4e9;
            color: white;
        }
        #dmate-new-idea{
            color: white;
            cursor: default;
            width: 130px;
            border-radius: 22px;
            background-color: #e0e4e9;
            margin-right: 12px;
        }
        .pick-active {
          color: black !important;
          cursor: pointer !important;
        }
        .pick-active:hover {
          {SEND_BUTTON_COLOR}
          color: white !important;
        }
        .new-idea-active{
          color: black !important;
          cursor: pointer !important;
        }
        .new-idea-active:hover{
          {GENNERATE_BUTTON_COLOR}
          color: white !important;
        }
        .dmate-buttons{
            height: 40px;
        }
        .dmate-wrapper{
            width: 100%;
            height: 60px;
            padding: 12px;
        }
    </style>
`;

widgetHtml = widgetHtml.replace("{SEND_BUTTON_TEXT}", SEND_BUTTON_TEXT);
widgetHtml = widgetHtml.replace("{SEND_BUTTON_COLOR}", SEND_BUTTON_COLOR);
widgetHtml = widgetHtml.replace("{GENNERATE_BUTTON_TEXT}", GENNERATE_BUTTON_TEXT);
widgetHtml = widgetHtml.replace("{GENNERATE_BUTTON_COLOR}", GENNERATE_BUTTON_COLOR);
widgetHtml = widgetHtml.replace("{SUPPORT_ADDRESS}", SUPPORT_ADDRESS);
widgetHtml = widgetHtml.replace("{SUPPORT_SUBJECT}", SUPPORT_SUBJECT);

return widgetHtml;
}