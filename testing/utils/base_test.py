import json
import unittest

class BaseTestClass(unittest.TestCase):
    
    def log(self, data) -> str:
        if isinstance(data, (dict, list)):
            return json.dumps(data, indent=4)
        else:
            return data
        
    @classmethod
    def setUpClass(cls):
        print(f"======SETTING UP {cls.__name__} ENVIRONMENT=======")
        super().setUpClass()
        
    def setUp(self):
        print(f"======SETTING UP {self.__class__.__name__} TEST=======")
        super().setUp()
        # Add payload to self
        self.payload = None
        
    def tearDown(self):
        print(f"======TEARING DOWN {self._testMethodName}======")
        super().tearDown()
        
    @classmethod
    def tearDownClass(cls) -> None:
        super().tearDownClass()
        print(f"======TEARING DOWN {cls.__name__} ENVIRONMENT======")
