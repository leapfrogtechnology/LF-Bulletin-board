
from collections import OrderedDict, namedtuple
import os
import re
from contextlib import contextmanager

from .compat import StringIO, PY2, WIN, text_type

__posix_variable = re.compile(r'\$\{[^\}]*\}')

def resolve_nested_variables(values):
    def _replacement(name):
        """
        get appropriate value for a variable name.
        first search in environ, if not found,
        then look into the dotenv variables
        """
        ret = os.getenv(name, new_values.get(name, ""))
        return ret

    def _re_sub_callback(match_object):
        """
        From a match object gets the variable name and returns
        the correct replacement
        """
        return _replacement(match_object.group()[2:-1])

    new_values = {}

    for k, v in values.items():
        new_values[k] = __posix_variable.sub(_re_sub_callback, v)

    return new_values

class DotEnv():

    def __init__(self, dotenv_path, verbose=False):
        self.dotenv_path = dotenv_path
        self._dict = None
        self.verbose = verbose  

    @contextmanager
    def _get_stream(self):
        if isinstance(self.dotenv_path, StringIO):
            yield self.dotenv_path
        elif os.path.isfile(self.dotenv_path):
            with io.open(self.dotenv_path) as stream:
                yield stream
        else:
            if self.verbose:
                warnings.warn("File doesn't exist {}".format(self.dotenv_path))
            yield StringIO('')

    def dict(self):
        """Return dotenv as dict"""
        if self._dict:
            return self._dict

        values = OrderedDict(self.parse())
        self._dict = resolve_nested_variables(values)
        return self._dict

    def parse(self):
        with self._get_stream() as stream:
            for mapping in parse_stream(stream):
                if mapping.key is not None and mapping.value is not None:
                    yield mapping.key, mapping.value

   

def load_dotenv(dotenv_path=None, stream=None, verbose=False, override=False):
    f = dotenv_path or stream
    return DotEnv(f, verbose=verbose)

load_dotenv(dotenv_path=".env")