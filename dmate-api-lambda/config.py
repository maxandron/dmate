from environs import Env

env = Env()
env.read_env()

OPTIONS_AMOUNT = env.int('OPTIONS_AMOUNT', 3)
OPENAI_API_KEY = env('OPENAI_API_KEY')
